---
title: Standalone Components
description: C'est quoi un Standalone Component dans Angular ?
---

C'est une nouveauté arrivée avec la version 14 d'Angular. Cette fonctionnalité permet de se passer des `@NgModule`, et c'est tant mieux !

```typescript
@Component({
  selector: 'app-header',
  standalone: true,
  template: `...`
})
export class HeaderComponent {}
```

En ajoutant l'attribut `standalone: true` à mon composant, je le rends standalone, ainsi je n'ai plus besoin de le déclarer dans un `@NgModule`, je peux l'utiliser directement dans un autre composant si celui-ci est également standalone en l'important dans l'attribut `imports`:

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent],
  template: `
    <app-header />
    <main>...</main>
  `
})
export class AppComponent {}
```

Je peux également utiliser les standalones components pour les composants de routing, et j'utilise `loadComponent` pour les lazy loader.

```typescript
export const appRoutes: Route[] = [
  {
    path: 'dashboard,
    loadComponent: import('./routes/dashboard/dashboard.component.ts')
  }
]
```