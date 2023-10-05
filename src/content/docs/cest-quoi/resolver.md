---
title: C'est quoi un Resolver ?
description: C'est quoi un Resolver dans Angular ?
sidebar:
  label: Resolver
---

Dans Angular, un **resolver** est une interface qui permet de précharger des données avant d'activer une route. C'est particulièrement utile lorsque vous voulez vous assurer que votre application a toutes les données nécessaires avant de rendre une vue ou d'initialiser un composant.

L'avantage principal d'utiliser un resolver est que vous pouvez gérer le chargement et les erreurs de données à un seul endroit, plutôt que dans chaque composant.

## Comment utiliser un resolver?

### 1. Créer un resolver

Tout d'abord, créez un service qui implémente l'interface `Resolve`.

```typescript
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataResolver implements Resolve<Data> {

  constructor(private dataService: DataService) {}

  resolve(): Observable<Data> {
    return this.dataService.fetchData();
  }
}
```

### 2. Ajouter le resolver à votre configuration de route
Dans votre module de routage ou votre configuration de route, ajoutez le resolver au chemin concerné.

```ts
const routes: Routes = [
  {
    path: 'data',
    component: DataComponent,
    resolve: {
      data: DataResolver
    }
  }
];

```

### 3. Accéder aux données résolues dans votre composant

Les données résolues sont disponibles dans l'objet ActivatedRoute dans votre composant.

```ts
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const resolvedData: Data = this.route.snapshot.data['data'];
  // Utilisez vos données ici
}

```

## Quand utiliser un resolver?
Les resolveurs sont utiles lorsque vous avez besoin de :

Précharger des données avant de naviguer vers une route.
Gérer les erreurs de chargement de données de manière centralisée.
Éviter de montrer une vue partiellement chargée ou un écran de chargement à l'utilisateur.
Cependant, les resolveurs peuvent rendre la navigation entre les routes plus lente, car la route n'est activée qu'après le chargement complet des données. Utilisez-les judicieusement!