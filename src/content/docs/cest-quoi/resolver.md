---
title: C'est quoi un Resolver ?
description: C'est quoi un Resolver dans Angular ?
sidebar:
  label: Resolver
---

Dans Angular, un **resolver** est une fonction qui permet de précharger des données avant d'activer une route. C'est particulièrement utile lorsque vous voulez vous assurer que votre application ait toutes les données nécessaires avant que l'utilisateur accède à une page.

### Créer un resolver

Tout d'abord, vous devez créer une fonction qui implémente l'interface `Resolve`.

```typescript
import { Observable } from 'rxjs';
import { type Pokemon, PokemonService } from '@features/pokemon';
import { inject } from '@angular/core';

export const pokemonResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  pokemonService = inject(PokemonService)
): Observable<Pokemon> => {
  const pokemonId = Number(route.paramMap.get('pokemonId'));
  return pokemonService.getPokemonById(pokemonId);
};

```

### Ajouter le resolver à votre configuration de route
Dans votre module de routage ou votre configuration de route, ajoutez le resolver au chemin concerné.

```ts
const routes: Routes = [
  {
   {
    path: ':pokemonId',
    component: PokemonRoute,
    resolve: {
      pokemon: pokemonResolver,
    },
  }
];

```

### Accéder aux données résolues dans votre composant

Les données résolues sont disponibles dans votre composant de deux façons.

#### ActivatedRoute

Grâce à `ActivatedRoute`, vous pouvez accéder à la résolue de manière synchrone ou asynchrone.

```ts
@Component({...})
export class PokemonRoute {
  route = inject(ActivatedRoute);

  pokemon = this.route.snapshot.data['pokemon'];
  pokemon$ = this.route.data.pipe(map(data => data['pokemon'])); // Observable
}
```

#### @Input()

Vous pouvez également utiliser la propriété `@Input()` pour accéder à la donnée résolue dans votre composant.

```ts
@Component({...})
export class PokemonRoute {
  @Input() pokemon: Pokemon;
}
```

Pour que cela fonctionne, vous devez activer cette fonctionnalité dans `appConfig` :

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
  ],
};
```