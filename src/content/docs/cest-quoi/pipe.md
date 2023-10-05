---
title: C'est quoi un Pipe ?
description: C'est quoi un Pipe dans Angular ?
sidebar:
  label: Pipe
---

Un **pipe** dans Angular est un moyen simple de transformer, formater ou filtrer une valeur dans votre template. Les pipes fonctionnent un peu comme les filtres en AngularJS (la version précédente d'Angular).

Lorsque vous utilisez un pipe dans un template, vous le faites suivre d'une barre verticale (`|`) et du nom du pipe. Vous pouvez également passer des arguments au pipe pour affiner la sortie.

## Exemples de pipes intégrés

### DatePipe
- Transforme une date en une chaîne formatée.
  ```html
  <p>{{ today | date:'medium' }}</p>
  ```

### UpperCasePipe et LowerCasePipe
- Transforme une chaîne en majuscules ou en minuscules.
  ```html
  <p>{{ 'hello world' | uppercase }}</p>
  <p>{{ 'HELLO WORLD' | lowercase }}</p>
  ```

### CurrencyPipe

- Transforme un nombre en une chaîne de devise, en utilisant le symbole de devise configuré par défaut pour la locale en cours.
  ```html
  <p>{{ 123 | currency }}</p>
  ```

### PercentPipe

- Transforme un nombre en une chaîne de pourcentage, multiplié par 100.
  ```html
  <p>{{ 0.5 | percent }}</p>
  ```

### DecimalPipe

- Transforme un nombre en une chaîne de nombre décimal, en utilisant le symbole de séparateur de décimales et le symbole de groupe configurés par défaut pour la locale en cours.
  ```html
  <p>{{ 123 | number }}</p>
  ```

### JsonPipe

- Transforme une valeur en une chaîne JSON.
  ```html
  <p>{{ {name: 'Angular'} | json }}</p>
  ```

### SlicePipe

- Crée un sous-ensemble d'un tableau ou d'une chaîne.
  ```html
  <p>{{ [1, 2, 3, 4, 5] | slice:1:3 }}</p>
  ```

### AsyncPipe

- Abonnez-vous à un `Observable` ou à une `Promise` et renvoyez la dernière valeur qu'il a émise.
  ```html
  <p>{{ observable$ | async }}</p>
  ```

## Créer un pipe personnalisé

En plus des pipes intégrés, Angular vous permet également de créer vos propres pipes personnalisés. Pour ce faire, vous pouvez utiliser le décorateur @Pipe pour définir un nouveau pipe et implémenter l'interface PipeTransform.

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'double' })
export class DoublePipe implements PipeTransform {
  transform(value: number): number {
    return value * 2;
  }
}
```

Vous pouvez ensuite utiliser votre pipe dans votre template :

```html

<p>{{ 2 | double }}</p>
```

Pour utiliser un pipe personnalisé dans un module, n'oubliez pas de l'ajouter à la liste des déclarations du module.

Les pipes sont puissants car ils vous permettent de maintenir une séparation claire entre votre logique métier et la présentation des données. Toutefois, n'abusez pas des pipes pour des opérations lourdes ou complexes, car cela pourrait avoir un impact sur les performances de votre application.

