---
title: C'est quoi le Routing ?
description: C'est quoi le Routing dans Angular ?
sidebar:
  label: Routing
---

C'est ce qui permet de relier une url à un composant.

```typescript
@Component({
  standalone: true,
  template: `ProductsListRoute`,
})
export default class ProductsListRoute {}
```
Maintenant que notre route est créee, on peut l'ajouter à notre router.

```typescript
export const appRoutes: Route[] = [
  { 
    path: 'products-list',
    component: ProductsListRoute
  },
]
```

Vous pouvez également lazy loader une route en utilisant `loadComponent` au lieu de `component` :

```typescript
export const appRoutes: Route[] = [
  {
    path: 'products-list',
    loadComponent: () => import('./products-list/products-list.route')
  },
]
```

Ainsi, le composant ne sera chargé que lorsque l'utilisateur accèdera à la route pour de meilleures performances.

### Sous routes

Vous pouvez imbriquer des routes en utilisant la propriété `children` :

```typescript
export const appRoutes: Route[] = [
  {
    path: 'products-list',
    component: ProductsListRoute,
    children: [
      {
        path: 'product/:id',
        component: ProductRoute,
      },
    ],
  },
]
```