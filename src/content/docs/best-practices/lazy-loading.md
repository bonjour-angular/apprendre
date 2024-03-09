---
title: Lazy loader vos pages
description: Lazy loader vos pages
---

En mettant en place le Lazy Loading, le compilateur d'Angular segmente les différentes routes de votre application en plusieurs modules JS (chunks). Ces modules ne sont chargés par le navigateur que lorsqu'ils sont requis, ce qui est typiquement le cas lorsqu'un utilisateur accède à une page spécifique.

Ainsi, le navigateur ne charge que le module JS associé à cette page pour de meilleures performances ! 

```ts
// app.routing.ts
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    // 👇 loadComponent lazy load un composant standalone
    loadComponent: () => import('./routes/products/products.route'),
  },
  {
    path: 'my-account',
    // 👇 loadChildren lazy load une route qui possède qui possède des sous routes
    loadChildren: () => import('./routes/my-account/my-account.routing'),
  },
];
```

```ts
// my-account.routing.ts
export default [
  {
    path: '',
    component: MyAccountRoute,
    children: [
      {
        path: '',
        loadComponent: () => import('./my-profile/my-profile.route'),
      },
      {
        path: 'purchases',
        loadComponent: () => import('./purchases/purchases.route'),
      },
    ]
  },

] as Routes;
```

Dans cette exemple, je lazy load un Standalone Component grâce à `loadComponent ` en pointant directement vers ce composant.
Je lazy load également `my-account` qui possède des sous routes grâce à `loadChildren` en pointant vers son tableau de routes contenant les sous routes (qui sont lazy load également !).

De plus, en faisant un `export default` sur le composant ou tableau de routes, nous n'avons même pas besoin d'écrire `.then(m => m.myComponent)` !