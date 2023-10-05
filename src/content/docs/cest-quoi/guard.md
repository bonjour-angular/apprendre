---
title: C'est quoi un Guard ?
description: C'est quoi un Guard dans Angular ?
sidebar:
  label: Guard
---

Un Guard c'est un peu comme un agent de sécurité à l'entré d'un bâtiment. Il va décider si vous avez le droit d'entrer ou de sortir. Sauf que là cet agent de sécurité est une fonction typescript, et le bâtiment c'est une page de votre application Angular ! Cette fonction doit être passer dans le `Router` Angular. Un cas courant est une page qu'on ne peut accéder que si on est connecter à l'application. 

```typescript
export function isLoggedInGuard(): CanActivateFn {
  return (route, state) => {
    const router = inject(Router);
    const isAuthenticated = inject(AuthService).isAuthenticated();

    if (isAuthenticated) return true;
    
     this.router.navigate(['login'])
     return false;
  }
}  
```
Ici on a définit un `Guard` qui vérifie is le user est loggué, si c'est le cas on return `true` donc on peut accéder à la page, sinon on navigate vers la page `login` et on return `false`.

```typescript
export const routes: Route[] = [
   { 
     path: 'profile',
     component: ProfileComponent,
     canActivate: [isLoggedInGuard]
   }
]
```

A noter qu'un `Guard` peut prendre un paramètre, ce qui est hyper pratique, on peut par exemple imaginer un `Guard` qui vérifie si le user est d'un certain rôle avant de le laisser passer.

L'inverse de `canActivate` est `canDeactivate`, cette fonction se déclenche au `destroy` du composant. Cela peut être utile sur une page d'édition de texte, on pourrait avoir envie d'afficher un message "Votre travail n'a pas été sauvegardé, voulez-vous vraiment quitter ?" lorsque le user ferme la fenêtre sa page.