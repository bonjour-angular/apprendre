---
title: C'est quoi @Input ?
description: C'est quoi @Input dans Angular ?
sidebar:
  label: Input
---

`@Input()` sert à passer une donnée d'un composant parent vers son composant enfant.

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

Ce composant affiche une liste de produits, et on veut pouvoir l'utiliser plusieurs fois dans notre application en y passant une liste de produits différents à chaque fois. Pour ce faire, on déclare une propriété précédée de `@Input()`.
Le nom de la propriété sera le nom à utiliser dans le consommateur du composant.

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

### Alias

On peut aussi donner un nom différent à la propriété entre son consommateur et le composant qui porte le `@Input()`, c'est ce qu'on appelle un alias.:

```typescript
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
  @Input({alias : 'products'}) items: Product[];
}
```

### Required

Nous pouvons rendre obligatoire nos `@Input()` grâce à la propriété `required`.

```ts
  @Input({required: true}) products: Product[];
```

En passant  `{required: true}` à votre @Input(), celui-ci devient requis lors de l'utilisation du composant, si vous ne le mettez pas alors vous aurez une erreur de compilation !

### Transform 

La propriété `transform` permet de transformer la valeur de l'`@Input()` avant qu'elle soit assignée à la propriété du composant.

```ts
  @Input({transform: (value: string) => value.toUpperCase()}) name: string;
```

Il existe plusieurs fonctions qu'Angular a mis à disposition pour transformer les valeurs des `@Input()` :
- `{transform: booleanAttribute}` : transforme la valeur en boolean
- `{transform: numberAttribute}` : transforme la valeur en nombre

### Route Input

`@Input()` permet aussi de récupérer les paramètres de la route dans le composant.
Pour que cela fonctionne, il faut activer cette fonctionnalité dans `appConfig` :

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
  ],
};
```

Vous pouvez ensuite récupérer les données de la route dans votre composant :

```ts
 {
    path: 'products/:id',
    loadComponent: () => import('./routes/products/products.route'),
    data: {
      showCart: true,
    },
  },
```

```ts	
@Component({
  template: `
    {{id}}
    {{showCart}}
    {{id}}
  `
})
export class ProductsComponent {
  @Input() id: string;
  @Input() foo: string;
  @Input() showCart: boolean;
}
```