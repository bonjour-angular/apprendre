---
title: C'est quoi un Guard ?
description: C'est quoi un Guard dans Angular ?
sidebar:
  label: Guard
---

Un Guard c'est un peu comme un agent de sécurité à l'entré d'un bâtiment. Il va décider si vous avez le droit d'entrer ou de sortir. Sauf que là cet agent de sécurité est une fonction typescript, et le bâtiment c'est une page de votre application Angular ! Cette fonction doit être passée dans le `Router` Angular. 

### CanActivate

Un cas courant est une page qu'on ne peut accéder que si on est connecté à l'application. 

```typescript
export function isLoggedInGuard(): CanActivateFn {
  return (route, state) => {
    const router = inject(Router);
    const isAuthenticated = inject(AuthService).isAuthenticated;

    if (isAuthenticated()) return true;
    return this.router.parseUrl('/login')
  }
}  
```
Ici on a définit un `Guard` qui vérifie is le user est loggué, si c'est le cas on return `true` donc on peut accéder à la page, sinon on retourne la page `login` ce qui annule la navigation précédente pour engager la nouvelle.

Il ne nous reste plus qu'à utiliser ce `Guard` dans une `Route`.

```typescript
export const routes: Route[] = [
   { 
     path: 'profile',
     component: ProfileComponent,
     canActivate: [isLoggedInGuard]
   }
]
```

### CanDeactivate

L'inverse de `canActivate` est `canDeactivate`, cette fonction se déclenche au `destroy` du composant et autorise, ou non, la sortie de la route. Cela peut être utile sur une page d'édition de texte, on pourrait avoir envie d'afficher un message "Votre travail n'a pas été sauvegardé, voulez-vous vraiment quitter ?" lorsque le user ferme la fenêtre sa page.

```typescript
export const canDeactivateFeedbackRouteGuard: CanDeactivateFn<FeedbackRoute> = 
(component: FeedbackRoute) => {
  if (!component.formCompleted()) {
    return window.confirm('Are you sure you want to leave?');
  } else {
    return true;
  }
};
```

