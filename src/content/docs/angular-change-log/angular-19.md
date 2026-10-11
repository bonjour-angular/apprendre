---
title: Angular 19
description: Angular 19
sidebar:
  badge:
    text: New
    variant: caution
---

Cette liste constitue les nouveautés majeures d'Angular 19. Pour une liste complète des changements, consultez le [Blog officiel](https://blog.angular.dev/meet-angular-v19-7b29dfd05b84)

### Standalone par défaut

Les composants, directives et pipes sont désormais standalone par défaut : plus besoin d'écrire `standalone: true`.

```ts
@Component({
  selector: "app-user",
  template: `<p>Bonjour !</p>`,
})
export class UserComponent {}
```

Les déclarations qui utilisent encore les `NgModule` doivent préciser `standalone: false`. La commande `ng update` s'en charge automatiquement.

Pour imposer le standalone dans tout votre projet, activez l'option `strictStandalone` :

```json
{
  "angularCompilerOptions": {
    "strictStandalone": true
  }
}
```

### Hydratation incrémentale

L'hydratation incrémentale (pas encore stable) permet de n'hydrater certaines parties de la page qu'au moment où elles sont nécessaires. Elle s'appuie sur les deferrable views `@defer` : le contenu est rendu côté serveur, mais son code JavaScript n'est chargé et hydraté que lorsque le trigger se déclenche.

```ts
bootstrapApplication(App, {
  providers: [provideClientHydration(withIncrementalHydration())],
});
```

```html
@defer (hydrate on viewport) {
  <shopping-cart />
}
```

### Event replay activé par défaut

L'event replay enregistre les interactions de l'utilisateur (clics, saisies…) qui ont lieu avant que l'hydratation soit terminée, puis les rejoue une fois le code chargé. Aucun événement n'est perdu.

Il est désormais activé par défaut dans les nouveaux projets avec SSR :

```ts
bootstrapApplication(App, {
  providers: [provideClientHydration(withEventReplay())],
});
```

### Render mode au niveau des routes

Vous pouvez maintenant choisir, route par route, comment chaque page est rendue (developer preview) :

- `RenderMode.Server` : rendu côté serveur à chaque requête (SSR)
- `RenderMode.Client` : rendu côté navigateur (CSR)
- `RenderMode.Prerender` : pré-rendu au moment du build (SSG)

```ts
// app.routes.server.ts
import { RenderMode, ServerRoute } from "@angular/ssr";

export const serverRoutes: ServerRoute[] = [
  { path: "", renderMode: RenderMode.Prerender },
  { path: "login", renderMode: RenderMode.Server },
  { path: "dashboard", renderMode: RenderMode.Client },
  { path: "**", renderMode: RenderMode.Server },
];
```

Ces routes sont ensuite fournies côté serveur avec `provideServerRoutesConfig(serverRoutes)`. Pour un nouveau projet : `ng new --ssr --server-routing`.

### `linkedSignal`

`linkedSignal` crée un signal modifiable dont la valeur est réinitialisée à chaque fois que sa source change (pas encore stable).

```ts
const options = signal(["apple", "banana", "fig"]);
const choice = linkedSignal(() => options()[0]);

choice.set("fig");
console.log(choice()); // "fig"

options.set(["peach", "kiwi"]);
console.log(choice()); // "peach"
```

### `resource()` et `rxResource()`

`resource()` (expérimental) permet de charger des données asynchrones à partir de signals. La requête est relancée automatiquement quand un signal utilisé dans `request` change.

```ts
userId = input.required<string>();

user = resource({
  request: () => ({ id: this.userId() }),
  loader: async ({ request, abortSignal }) => {
    const response = await fetch(`/api/users/${request.id}`, {
      signal: abortSignal,
    });
    return response.json();
  },
});
```

Le résultat est exposé sous forme de signals : `user.value()`, `user.isLoading()`, `user.error()`, `user.status()`. Il est aussi possible de relancer la requête avec `user.reload()`.

`rxResource()`, disponible dans `@angular/core/rxjs-interop`, fonctionne de la même manière avec un loader qui retourne un Observable :

```ts
user = rxResource({
  request: () => ({ id: this.userId() }),
  loader: ({ request }) => this.http.get<User>(`/api/users/${request.id}`),
});
```

### HMR pour les styles et les templates

Le Hot Module Replacement est disponible avec `ng serve` :

- les modifications des styles d'un composant sont appliquées sans recharger la page, par défaut
- les modifications des templates sont supportées de manière expérimentale

Pour essayer le HMR des templates :

```bash
NG_HMR_TEMPLATES=1 ng serve
```

### `@let` est stable

La syntaxe `@let`, qui permet de déclarer des variables locales directement dans le template, est désormais stable.

```html
@let user = user$ | async;

@if (user) {
  <h1>Bonjour {{ user.name }}</h1>
}
```
