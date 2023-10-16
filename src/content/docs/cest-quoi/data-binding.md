---
title: C'est quoi le Data binding ?
description: C'est quoi le Data binding dans Angular ?
sidebar:
  label: Data binding
---

Le data binding permet de lire et/ou synchroniser les propriétés et méthodes de vos composants directement dans leurs templates.

Il existe 4 types de data binding dans Angular.

### Interpolation

L'interpolation permet d'afficher une valeur dans le template. Pour cela, on utilise la syntaxe `{{ }}`.

```ts
@Component({
  template: `
    <p>Mon nom est {{ name }}</p>
    <p>{{ copyright }}</p>
  `
})
export class AppComponent {
  name = 'Emeline';
  copyright = `Bonjour Angular, ${new Date().getFullYear()}`
}
```

### Property binding

Le property binding permet de lier une propriété d'un élément HTML à une valeur dans le composant. Pour cela, on utilise la syntaxe `[ ]`.

```ts
@Component({
  template: `
    <button [disabled]="isDisabled">Mon bouton</button>
    <img [src]="image" />
  `
})
export class AppComponent {
  isDisabled = true;
  image = 'https://angular.io/assets/images/logos/angular/angular.png';
}
```

### Event binding

L'event binding permet de lier un événement d'un élément HTML à une méthode dans le composant. Pour cela, on utilise la syntaxe `( )`.
Il existe beaucoup d'événements comme `click`, `change`, `input`, `keyup`, `keydown`, `mouseover`, `mouseout`, `focus`, `blur`, etc.

```ts
@Component({
  template: `
    <button (click)="alert('Bonjour Angular!')">Alert</button>
  `
})
export class AppComponent {
  alert(message: string) {
    window.alert(message);
  }
}
```

Certains évènements exposent des propriétés comme `$event` qui contient des informations sur l'événement.

```html
<input type="text" (input)="onInput($event)" /> <!-- $event contient la valeur de l'input -->
<button>Click me!</button (click)="onClick($event)" /> // <!-- $event contient l'objet MouseEvent -->
```

A noter que vous pouvez créer des évènements personnalisés pour vos composants avec [`@Output()`](/cest-quoi/output).

### Two-way binding

Le two-way binding est une fonctionnalité qui crée une connexion bidirectionnelle entre un élément HTML et un composant. Cela signifie que toute modification apportée à l'élément est reflétée dans le composant, et vice-versa. Pour réaliser cette liaison, on utilise la syntaxe `[( )]`.

```ts
@Component({
  template: `
    <input type="text" [(ngModel)]="name" />
    <p>Mon nom est {{ name }}</p>
  `
})
export class AppComponent {
  name = 'Emeline';
}
```

Ici, si l'utilisateur écrit dans l'input, cela modifiera la propriété `name` et ce changement sera reflété automatiquement dans `{{ name }}`.