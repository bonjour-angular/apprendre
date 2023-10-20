---
title: C'est quoi RxJS ?
description: C'est quoi RxJS dans Angular ?
sidebar:
  label: RxJS
---

:::note
J'ai créé un article complet sur RxJS, vous pouvez le retrouver [ici](/articles/tout-ce-que-je-sais-sur-rxjs).
:::

RxJS permet de faire de la programmation réactive dans Angular.

RxJS nous apporte la notion d'`Observable` et d'`operators`. Un `Observable` est un flux d'évènements sur lequel on peut s'abonner pour réagir à chaque fois qu'un évènement passe. Les `operators` permettent de manipuler les évènements des `Observable` pour les transformer, les combiner, les filtrer, etc.

Le flux des `Observable` sont, par défaut, fermés. Cela signifie que si on ne s'abonne pas à un `Observable`, on ne recevra pas les évènements.

Dans Angular, RxJS est beaucoup utilisé :
- Dans les requêtes HTTP
- Dans la manipulation des routes
- Dans les formulaires
- Et autres

### Créer et lire les données d'un Observable

Il existe beaucoup d'opérateurs pour créer des `Observable`, `interval` en est un exemple et émet un nombre dans un intervalle de temps donné.

```typescript
@Component({
  template: `
    <p>Counter: {{counter$ | async}}</p>
  `
})
export class MyComponent {
  counter$ = interval(1000);
}
```

Ici, `counter$` est un `Observable` qui émet un nombre toutes les secondes. Pour afficher la valeur de `counter$`, il faut utiliser le pipe `async` qui permet de souscrire à l'`Observable` et de se désabonner automatiquement lorsque le composant est détruit.

### Créer une valeur dérivée d'un Observable

```typescript
@Component({
  template: `
    <p>Counter: {{counter$ | async}}</p>
    <p>Double Counter: {{doubleCounter$ | async}}</p>
  `
})
export class MyComponent {
  counter$ = interval(1000);
  doubleCounter$ = this.counter$.pipe(
    map(value => value * 2));
}
```

Ici, `doubleCounter$` est un `Observable` qui émet un nombre toutes les secondes, mais qui est le double de `counter$`. Grâce à l'opérateur `map`, on transforme la valeur de `counter$` avant qu'elle soit émise par `doubleCounter$`.