---
title: Lazy loader vos pages
description: Utilisez 'default' pour avoir un routing plus simple
---

En mettant en place le Lazy Loading, le compilateur d'Angular segmente les différentes routes de votre application en plusieurs modules JS. Ces modules ne sont chargés par le navigateur que lorsqu'ils sont nécessairement requis, ce qui est typiquement le cas lorsqu'un utilisateur accède à une page spécifique.

Ainsi, le navigateur ne charge que le module JS associé à cette page et rien d'autre résultant donc à un initial load réduit ! :rocket:

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
    loadComponent: () => import('./routes/products/products.route'),
  },
  {
    path: 'my-account',
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