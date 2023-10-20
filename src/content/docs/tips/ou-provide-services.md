---
title: Où provider les services ?
description: Où provider les services ?
---

La plupart du temps les Services sont des Singletons, c'est à dire qu'il n'en existe qu'une seule instance et que chaque élément qui l'injecte utilise le même état du service.

Mais vous pouvez les scoper de bien des façons.

#### Vous avez besoin d'un state global

```ts
@Injectable({ providedIn: 'root' })
export class AuthService {...}
```

`{providedIn: 'root'}` pour un Service disponible partout au sein de l'app (le fameux singleton).
Utilisez ça si vous avez besoin du même state à plusieurs endroits. 

#### Vous avez besoin d'un state différent pour chaque composant

```ts
@Injectable()
export class MyFeatureService {...}

@Component({
  providers: [MyFeatureService]
  template: `...`,
})
export class MyFeatureComponent {
  private readonly myFeatureService= inject(MyFeatureService); 
}
```

Utilisez la propriété `providers` d'un composant pour une donnée disponible seulement au niveau du composant. C'est ce qu'on appelle du local state.

#### Vous avez besoin d'un state disponible au niveau d'une route et de ses sous-routes

```ts
export const featureRoutes: Route[] = [
  {
     path: '',
     component: MyFeatureComponent,
     providers: [MyFeatureService],
     canActivate: [MyFeatureGuard],
     children: [...]
  }
]
```

Utilisez la propriété `providers` de la route qui se trouve dans le fichier de routing.
En faisant cela, je scope le service à cet endroit là, donc si `MyFeatureComponent` ou `MyFeatureGuard` injecte le service et l'utilise alors ils utiliseront le même state.