---
title: Standalone Components
description: C'est quoi un Standalone Component dans Angular ?
---

Les standalones components sont arrivés avec la version 14 d'Angular. Ils rendent l'utilisation des `@NgModule` optionel grâce à l'attribut `standalone` que l'on peut ajouter à un composant.

### Créer un Standalone Component

```typescript
@Component({
  selector: 'app-header',
  standalone: true,
  template: `...`
})
export class HeaderComponent {}
```

En ajoutant l'attribut `standalone: true` à mon composant, je le rends autonome, ainsi je n'ai plus besoin de le déclarer dans un `@NgModule`, je peux l'utiliser directement dans un autre composant si celui-ci est également standalone en l'important dans l'attribut `imports`.

### Utiliser un Standalone Component

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

Ici, j'importe mon `HeaderComponent` dans mon `AppComponent` et je peux l'utiliser comme n'importe quel autre composant.

### Le routing avec les Standalone Components

Pour lier une URL à un composant standalone et le lazy loader, j'utilise `loadComponent`.

```typescript
export const appRoutes: Route[] = [
  {
    path: 'dashboard,
    loadComponent: import('./routes/dashboard/dashboard.component.ts')
  }
]
```

Et pour les routes qui possèdent des sous-routes, j'utilise `loadChildren` et je pointe vers un tableau de routes.

```typescript

export const appRoutes: Route[] = [
  {
    path: 'products',
    loadChildren: () => import('./routes/products/products.routes.ts')
  }
]
```