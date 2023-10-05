---
title: C'est quoi le Routing ?
description: C'est quoi le Routing dans Angular ?
sidebar:
  label: Routing
---

C'est ce qui permet de relier une url au template (le HTML et CSS) d'un composant. En gros vous faites votre composant, puis dans le router vous indiquez que lorsque l'utilisateur ira sur le path `dashboard` alors Angular devra afficher le composant `dashboard`.
Le Router nous permet également de "lazy loader"  les composants, c'est à dire les charger uniquement lorsque l'utilisateur arrive sur le path (histoire de gagner en performance).
On peut y ajouter d'autres fonctionnalités comme les `Guards` par exemple (voir section juste en dessous)

Un exemple 

```typescript
export const routes: Route[] = [
   { path: '', component: LoginComponent },
   { path: 'dashboard', loadComponent: () => import('./routes/dashboard/dashboard.component.ts')},
]
```