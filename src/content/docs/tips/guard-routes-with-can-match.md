---
title: Protéger vos routes au même path
description: Protéger vos routes au même path
---

Parfois vous aurez envie qu'un même path renvoie sur deux routes (composants) différents selon une condition, cela peut-être le rôle de l'utilisateur ou un feature flag.

Le problème c'est que `canActivate` ne permet pas de faire ça, mais `canMatch` oui !

👉Si le guard passé dans le `canMatch` renvoie `false`, alors le router va skip la route actuelle et essayer les routes suivantes !

```ts

export function hasRoleGuard(role: Role): CanActivateFn {       
  return (route, state) => {
    const role$ = inject(UserStore).role$:
    
    // actuellement ce role 👇 est 'student'
    return role$.pipe(map(userRole => userRole === role));  
  };
} 

```

```ts
export const appRoutes: Route [] = [
  {
    path: 'room',
    loadComponent: () => import('./teachers-room.component'),
    // grâce à canMatch, le router va sauter ce path et essayer 
    // le path 'room' suivant car 👇 renvoie false
    canMatch: [hasRoleGuard('teacher')]
  }, 
  {
    path: 'room',
    loadComponent: () => import('./students-room.component'),
    // et ici, 👇 renvoie true donc 👆 va être chargé
    canMatch: [hasRoleGuard('student')]
  },
]
```