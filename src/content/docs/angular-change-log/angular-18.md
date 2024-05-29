---
title: Angular 18
description: Angular 18
sidebar:
  badge:
    text: New
    variant: caution
---

Cette liste constitue les nouveautés majeures d'Angular 18. Pour une liste complète des changements, consultez le [Blog officiel](https://blog.angular.dev/angular-v18-is-now-available-e79d5ac0affe)

### Avancée majeure vers le zoneless

Angular propose un support expérimental pour le mode zoneless. Cela permet

- une amélioration des performances de vos apps
- une réduction de la taille de votre bundle
- une meilleure intégration de micro-frontends
- un debugging plus simple

Pour essayer le mode zoneless :

```ts
bootstrapApplication(App, {
  providers: [provideExperimentalZonelessChangeDetection()],
});
```

### Nouvelle documentation officiel

[angular.dev](https://angular.dev/) remplace désormais angular.io de manière définitive.

### Stabilité de plusieurs fonctionnalités

Les fonctionnaltiés suivantes sont désormais stables et prêtes à être utilisées en production :

- Deferrable view : `@defer`
- Nouveau Control Flow : `@if`, `@for`
- Material 3

### Amélioration de `ng-content`

`ng-content` supporte désormais un fallback par défaut.

```html
<!-- card.component.html -->
<ng-content select="header">Default card title</ng-content>
<ng-content>Default card content</ng-content>
```

### Propriété `events` sur les `FormControl`, `FormArray` et `FormGroup`

```ts
const nameControl = new FormControl<string | null>("name", Validators.required);
nameControl.events.subscribe((event) => {
  // process the individual events
});
```

### Fonction sur les route redirect

```ts
const routes: Routes = [
  {
    path: "old-user-page",
    redirectTo: ({ queryParams }) => {
      if (queryParams["userId"] !== undefined) {
        return `/user/${queryParams["userId"]}`;
      } else {
        return `/not-found`;
      }
    },
  },
  { path: "user/:userId", component: User },
  { path: "**", component: NotFound },
];
```
