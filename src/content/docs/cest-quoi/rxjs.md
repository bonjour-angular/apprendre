---
title: C'est quoi RxJS ?
description: C'est quoi RxJS dans Angular ?
sidebar:
  label: RxJS
---


C'est une librairie tierce automatiquement installée en tant que dépendance dans les applications Angular.
En termes simples, elle permet de mettre à disposition les `Observable` ainsi que des `operators` pour manipuler "simplement" (ou pas) nos flux de données et rendre nos applications réactives. Par convention, on suffixe nos `Observables` avec un signe `$`. Ensuite on peut afficher la valeur actuelle de notre `Observable` avec le pipe `async`.

```typescript
@Component({
  ...
  template: `
    <p>Counter: {{counter$ | async}}</p>
    <p>Double Counter: {{doubleCounter$ | async}}</p>
    <button (click)="counterStore.increment()">Increment</button>
    <button (click)="counterStore.decrement()">Decrement</button>
  `
  ...
})
export class MyComponent {
  counterStore = inject(CounterStore);
  counter$ = counterStore.counter$;
  doubleCounter$ = this.counter$.pipe(
    map(value => value * 2));
}
``` 

Voici un exemple très simple où `counter$` est un un compteur qui peut être incrémenter ou décrémenter.  Chaque fois qu'on incrémente ou décrémente, `counter$` change et également `doubleCounter$` car celui-ci est dépendant de `doubleCounter$` ! C'est cela la programmation réactive : coder en pensant à la propagation des changements.
C'est un sujet complexe mais qui, une fois maîtrisée, vous permettra de faire du code très propre et agréable à faire évoluer !