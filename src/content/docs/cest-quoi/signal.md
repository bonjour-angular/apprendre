---
title: Signal
description: A reference page in my new Starlight docs site.
sidebar:
    badge:
        text: New
        variant: caution
---

:::note
Toutes les fonctionnalités des Signal ne sont pas encore disponibles. A terme, les composants Angular seront `signal based` ce qui introduira encore plus de nouvelles fonctionnalités. [Pour en savoir plus](https://github.com/angular/angular/discussions/49685)
:::

:::note
Si vous voulez tout savoir sur les Signal, j'ai créé un article complet à ce sujet. [Pour en savoir plus](https://medium.com/@kevin.tale/tout-comprendre-sur-les-signals-dans-angular-7bbbbf00b975)
:::

Les Signals sont arrivés avec Angular 16.

Ils ont pour vocation d'adresser deux problématiques :
1. RxJS qui n'est pas toujours simple à utiliser
2. La change detection qui peut être optimisée

## Créer un Signal

```typescript
@Component({
  template: `
   <p>{{ celsius() }}</p>
  `
})
export class AppComponent {
  celsius = signal(25);
}
```

Ici, on crée un signal `celsius` qui a pour valeur initiale `25`. On peut ensuite utiliser ce signal dans notre template avec la syntaxe `{{ celsius() }}`.

## Modifier un Signal

```typescript
@Component({
  template: `
   <button (click)="doubleCelsius()">Doubler le degré celsius</button>
   <p>{{ celsius() }}</p> 
  `

})
export class AppComponent {
  celsius = signal(25);

  doubleCelsius() {
    this.celsius.update(celsius => celsius * 2); 
    this.celsius.set(this.celsius() * 2); // on peut aussi faire comme ça, ça revient au même
  }
}
```

`signal` expose plusieurs méthodes pour modifier la valeur du signal :
- `update` : permet de modifier la valeur du signal en fonction de sa valeur actuelle
- `set` : permet de modifier la valeur du signal en lui donnant une nouvelle valeur

## Créer une valeur dérivée d'un Signal

```typescript
@Component({
  template: `
   <button (click)="doubleCelsius()">Doubler le degré celsius</button>
   <p>{{ celsius() }}</p> 
   <p>{{ fahrenheit() }}</p>
  `

})
export class AppComponent {
  celsius = signal(25);
  fahrenheit = computed(() => this.celsius() * 1.8 + 32);

  doubleCelsius() {
    this.celsius.update(celsius => celsius * 2); 
  }
}
```

`computed` permet de créer un signal qui dépend d'un ou plusieurs autres Signal. Ici, `fahrenheit` dépend de `celsius`. A chaque fois que `celsius` change, `fahrenheit` est recalculé.