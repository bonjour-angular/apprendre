---
title: Styliser vos composants avec host
description: Utilisez 'default' pour avoir un routing plus simple
---

Réduisez le *boilerplate* de votre routing Angular en utilisant le mot clé `default` afin de signifier à typescript quel objet vous exportez par défaut. Ainsi, plus besoin de préciser `then(m => m.MyModule)`, c'est toujours ça de pris ! :nerd:

Je peux faire ça avec un composant :
```typescript
@Component({
  standalone: true,
  template: `...`
})
export default class DashboardComponent {}
```
Et aussi avec mes routes :
```typescript
export default [
  {
    path: '',
    component: AboutComponent
  }  
] as Route[];
```
Puis j'ai le droit d'import sans utiliser `then()` !
```typescript
export const appRoutes: Route[] = [
   {
     path: '',
     component: AppComponent,
   },
   {
     path: 'dashboard',
     loadComponent: () => import('./dashboard/dashboard.component'),
   }, 
   {
     path: 'about',
     loadChildren: () => import('./about/about.routes'),
   }, 
]
```