---
title: C'est quoi le Data binding ?
description: C'est quoi le Data binding dans Angular ?
sidebar:
  label: Data binding
---

Le Data binding est un mécanisme qui permet de lier des données entre elles. Dans Angular, il existe 4 types de Data binding :

## Interpolation

L'interpolation permet d'afficher une valeur dans le template. Pour cela, on utilise la syntaxe `{{ }}` :

```html
<p>Mon nom est {{ name }}</p>
```

## Property binding

Le property binding permet de lier une propriété d'un élément HTML à une valeur dans le composant. Pour cela, on utilise la syntaxe `[ ]` :

```html
<button [disabled]="isDisabled">Mon bouton</button>
```

## Event binding

L'event binding permet de lier un événement d'un élément HTML à une méthode dans le composant. Pour cela, on utilise la syntaxe `( )` :

```html
<button (click)="onClick()">Mon bouton</button>
```

## Two-way binding

Le two-way binding permet de lier une propriété d'un élément HTML à une valeur dans le composant, et de lier un événement de cet élément à une méthode dans le composant. Pour cela, on utilise la syntaxe `[( )]` :

```html
<input [(ngModel)]="name" />
```