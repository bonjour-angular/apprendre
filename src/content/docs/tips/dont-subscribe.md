---
title: async au lieu de .subscribe()
description: async au lieu de .subscribe()
---

Une bonne pratique à toujours mettre en place si vous voulez afficher une donnée dans votre template : utilisez `obs$ | async` au lieu de `obs$.subscribe(...)`.

```typescript
// ✅ GOOD
@Component({
  standalone: true,
  template: `
    <ul>
      <li *ngFor="let product of products$ | async">
        ...
      </li>
    </ul>
  `,
  imports: [CommonModule],
})
export default class ProductsComponent {
  private readonly productsService = inject(productsService);
  protected readonly products$ = this.productsService.products$;
}
```
```typescript
// ❌ BAD
@Component({
  standalone: true,
  template: `
    <ul>
      <li *ngFor="let product of products">
        ...
      </li>
    </ul>
  `,
  imports: [NgFor],
})
export default class ProductsComponent implement OnInit {
  private productsService = inject(productsService);

  products: Product[] = [];

  ngOnInit() {
    this.productsService.products$.subscribe(products => this.products = products)
  }
}
```

Il y a plusieurs problèmes avec le second code comparé au premier :
- On doit parcourir tout le code pour comprendre ce qu'il advient de `products` ce qui nuit à la compréhension (code impératif vs déclaratif)
- Utiliser `.subscribe` manuellement implique le fait de devoir `unsubscribe` pour éviter les fuites mémoires, c'est donc une action à faire en plus. Le `| async` unsubscribe automatiquement à la destruction de notre composant alors autant en profiter !
- Si notre composant est `onPush`, `products` pourrait ne pas se mettre correctement à jour
- C'est plus verbeux pour un code moins efficace

Théoriquement vous ne devriez jamais avoir à utiliser `subscribe()` pour lire des données dans vos templates, ce qui est une bonne chose car ça vous force à avoir du code réactif !