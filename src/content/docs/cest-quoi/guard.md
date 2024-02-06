---
title: C'est quoi un Guard ?
description: C'est quoi un Guard dans Angular ?
sidebar:
  label: Guard
---

Un Guard permet d'autoriser ou non la navigation vers une route. Il existe plusieurs types de `Guard` dans Angular.

### CanActivate

Un cas courant est une route qu'on ne peut accéder que si on est connecté à l'application.

```typescript
export function isLoggedInGuard(): CanActivateFn {
  return (route, state) => {
    const router = inject(Router);
    const isAuthenticated = inject(AuthService).isAuthenticated;

    if (isAuthenticated()) return true;
    return this.router.parseUrl("/login");
  };
}
```

Ici on a définit un `Guard` qui vérifie si le user est connecté, si c'est le cas on renvoie `true` donc on peut accéder à la route, sinon on retourne la route `login` ce qui annule la navigation précédente et navigue vers la route `login`.

Il ne nous reste plus qu'à utiliser ce `Guard` dans une `Route`.

```typescript
export const routes: Route[] = [
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [isLoggedInGuard],
  },
];
```

### CanDeactivate

`canDeactivate` est l'inverse de `canActivate`. Il permet de vérifier si on peut quitter une route. Par exemple, si on a un formulaire non sauvegardé, on pourrait vouloir afficher un message de confirmation avant de quitter la route.

```typescript
export const canDeactivateFeedbackRouteGuard: CanDeactivateFn<FeedbackRoute> = (
  component: FeedbackRoute
) => {
  if (!component.formCompleted()) {
    return window.confirm("Are you sure you want to leave?");
  } else {
    return true;
  }
};
```

Ici, on vérifie si le formulaire est complété, si ce n'est pas le cas on demande une confirmation avant de quitter la route.

On utilise ce `Guard` de la même manière que `canActivate` en le plaçant dans la route.

### CanMatch

`canMatch` permet de vérifier si une route peut être activée, tout comme `canActivate`, mais si ce n'est pas le cas alors le router va essayer de matcher une autre route avec le même path.

```typescript
export function hasRoleGuard(role: Role): CanActivateFn {
  return (route, state) => {
    const role$ = inject(UserStore).role$:

    // actuellement ce role 👇 est 'student'
    return role$.pipe(map(userRole => userRole === role));
  };
}
```

```typescript
export const appRoutes: Route[] = [
  {
    path: "room",
    loadComponent: () => import("./teachers-room.component"),
    // grâce à canMatch, le router va sauter ce path et essayer
    // le path 'room' suivant car 👇 renvoie false
    canMatch: [hasRoleGuard("teacher")],
  },
  {
    path: "room",
    loadComponent: () => import("./students-room.component"),
    // et ici, 👇 renvoie true donc 👆 va être chargé
    canMatch: [hasRoleGuard("student")],
  },
];
```
