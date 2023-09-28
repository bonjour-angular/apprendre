---
title: Input
description: C'est quoi @Input() dans Angular ?
---

C'est un Decorator disponible nativement dans Angular.

Il sert à passer des données d'un composant vers un autre composant utilisé dans son template, en d'autres termes son composant enfant.

Imaginons que nous avons un composant qui affiche une liste de produits sur notre site ecommerce :

```typescript
@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [NgFor],
  template: `
    <ul>
      <li *ngFor="let product of products">
         {{product.name}} costs {{product.price}}
      </li>
    </ul>
  `
})
export class ProductsListComponent{
  @Input() products: Product[];
}
```

Ce composant affiche une liste de produits, et on veut pouvoir l'utiliser plusieurs fois dans notre application en y passant une liste de produits différents à chaque fois. Pour ce faire, on déclare une propriété en la décorant du decorator  `@Input()`  . Le nom de la propriété sera le nom à utiliser dans le consommateur du composant.

Et voilà à l'utilisation :

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsListComponent],
  template: `
    <app-products-list [products]="shirts" />
    <app-products-list [products]="pants" />
  `
})
export class AppComponent {
  shirts = [
    {id: 0, name: 'shirt1', price: 20},
    {id: 1, name: 'shirt2', price: 10},
    {id: 2, name: 'shirt3', price: 15},
  ]

  pants = [
    {id: 0, name: 'pant1', price: 20},
    {id: 1, name: 'pant2', price: 10},
    {id: 2, name: 'pant3', price: 15},
  ]
}
```

Ici, on a un composant qui utilise deux fois le composant `ProductsListComponent` dans le template en y passant une liste différente à chaque fois grâce à l'attribut `[products]` qui correspond au nom qu'on a utilisé dans le composant ! 

On peut aussi  donner un nom différent à la propriété entre son consommateur et le composant qui porte le @Input() :
```typescript
...
@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [NgFor],
  template: `
    <ul>
      <li *ngFor="let item of items">
         {{item.name}} costs {{item.price}}
      </li>
    </ul>
  `
})
export class ProductsListComponent{
  @Input('products') items: Product[];
}
```

Une nouveauté depuis Angular 16 : les required  @Input()  :

```
  @Input({required: true}) products: Product[];
```

En passant  `{required: true}` à votre @Input(), celui-ci devient requis lors de l'utilisation du composant, si vous ne le mettez pas alors vous aurez une erreur de compilation !