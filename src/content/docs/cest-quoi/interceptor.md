---
title: C'est quoi un Interceptor ?
description: C'est quoi un Interceptor dans Angular ?
sidebar:
  label: Interceptor
---

Un Interceptor permet d'intercepter toutes les requêtes Http faites avec le [`HttpClient`](/cest-quoi/http-client) pour les modifier avant qu'elles partent, ou pour traiter leur réponse avant qu'elle n'arrive dans vos services. On s'en sert dans presque toutes les applications : ajouter un token d'authentification, gérer les erreurs, afficher un loader etc.

Depuis Angular 15, un Interceptor est une simple fonction de type `HttpInterceptorFn`. Elle reçoit la requête (`req`) et une fonction `next` qui permet de passer la requête à l'Interceptor suivant (ou au serveur s'il n'y en a plus).

### Ajouter un header Authorization

Un cas courant est d'ajouter le token du user connecté à chaque requête.

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();

  if (!token) return next(req);

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
  return next(authReq);
};
```

Ici on récupère le token, s'il n'y en a pas on laisse passer la requête telle quelle, sinon on ajoute le header `Authorization`. A noter qu'une requête est immuable, il faut donc la `clone()` pour la modifier.

### Gérer une erreur 401

`next(req)` renvoie un `Observable` de la réponse, on peut donc utiliser les opérateurs RxJS pour réagir à une erreur.

```typescript
export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(["/login"]);
      }
      return throwError(() => error);
    })
  );
};
```

Ici, si le serveur répond avec une erreur 401 (user non authentifié), on redirige vers la route `login`. Dans tous les cas on renvoie l'erreur pour que l'appelant puisse aussi la gérer s'il le souhaite.

### Enregistrer les Interceptors

Il ne nous reste plus qu'à déclarer nos Interceptors avec `withInterceptors()` dans `provideHttpClient()`.

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, unauthorizedInterceptor])
    ),
  ],
};
```

Les Interceptors sont exécutés dans l'ordre du tableau pour la requête, et dans l'ordre inverse pour la réponse.

> **Note** : Avant les Interceptors fonctionnels, on écrivait des classes qui implémentent l'interface `HttpInterceptor`, enregistrées avec le token `HTTP_INTERCEPTORS` : c'est l'ancienne forme, que vous croiserez encore dans beaucoup de projets.
