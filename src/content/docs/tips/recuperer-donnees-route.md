---
title: Récupérer les données de la Route
description: Utilisez 'default' pour avoir un routing plus simple
---

Imaginons cette route :

```ts
  {
    path: 'products/:id',
    loadComponent: () => import('./routes/products/products.route'),
    data: {
      showCart: true,
    },
  },
```

Jusqu'à maintenant si vous vouliez récupérer `:id` ou `showCart` ou encore un `queryParam`comme `/product?foo=123`, il fallait faire :

```ts
@Component({
  template: `
    <h2>Snapshot</h2>
    {{ id }}
    {{ showCart }}
    {{ foo }}

    <h2>Observable</h2>
    {{ id$ | async }}
    {{ showCart$ | async }}
    {{ foo$ | async }}
  `,
})
export class ProductsComponent {
  private activatedRoute = inject(ActivatedRoute);

  // Snapshot
  id = this.activatedRoute.snapshot.params["id"];
  showCart = this.activatedRoute.snapshot.data["showCart"];
  foo = this.activatedRoute.snapshot.queryParams["foo"];

  // Observables
  id$ = this.activatedRoute.params.pipe(map((params) => params["id"]));
  showCart$ = this.activatedRoute.data.pipe(map((data) => data["showCart"]));
  foo$ = this.activatedRoute.queryParams.pipe(
    map((queryParams) => queryParams["foo"])
  );
}
```

Et bien **depuis la version 16** de Angular, tout cela est grandement simplifié !
Grâce à `@Input()` vous pourrez récupérer ces trois données directement !

```ts
@Component({
  template: `
    {{ id }}
    {{ showCart }}
    {{ id }}
  `,
})
export class ProductsComponent {
  @Input() id: string;
  @Input() foo: string;
  @Input() showCart: boolean;
}
```

Il suffit simplement de nommer votre `@Input()` comme le nom de la donnée sur laquelle vous voulez être bindé, et c'est tout !

Il faut également ajouter `withComponentInputBinding()` dans votre config, comme ceci :

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding())],
};
```
