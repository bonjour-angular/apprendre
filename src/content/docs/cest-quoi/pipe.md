---
title: C'est quoi un Pipe ?
description: C'est quoi un Pipe dans Angular ?
sidebar:
  label: Pipe
---

Un **pipe** dans Angular est un moyen simple de transformer, formater ou filtrer une valeur dans votre template.

Lorsque vous utilisez un pipe dans un template, vous le faites suivre d'une barre verticale (`|`) et du nom du pipe. Vous pouvez également passer des arguments aux pipes.

### DatePipe
Transforme une date en une chaîne formatée.

```html
<p>{{ today | date:'medium' }}</p> // Oct 16, 2023, 6:55:33 PM (comme ça vous savez quand est-ce que j'ai écrit cette doc!) 
```

### UpperCasePipe et LowerCasePipe
Transforme une chaîne en majuscules ou en minuscules.

```html
<p>{{ 'hello world' | uppercase }}</p> // HELLO WORLD
<p>{{ 'HELLO WORLD' | lowercase }}</p> // hello world
```


### CurrencyPipe

Transforme un nombre en une chaîne de devise, en utilisant le symbole de devise configuré par défaut pour la locale en cours.

```html
<p>{{ 123 | currency }}</p> // $123.00
```

### PercentPipe

Transforme un nombre en une chaîne de pourcentage, multiplié par 100.

```html
<p>{{ 0.5 | percent }}</p> // 50%
```

### DecimalPipe

transforme un nombre en une chaîne de caractères formatée, en suivant des règles de localisation pour la représentation des nombres décimaux, des milliers, et permettant de définir le nombre de chiffres avant et après la virgule.

```html
<p>{{ 1234.56 | number:'3.4-4' }}</p> // 1,234.5600
```

### JsonPipe

Transforme une valeur en une chaîne JSON.

```html
<p>{{ resultFromHttpCall | json }}</p>
```

### SlicePipe

Crée un sous-ensemble d'un tableau ou d'une chaîne.

```html
<p>{{ [1, 2, 3, 4, 5] | slice:1:3 }}</p> // [2, 3]
```

### AsyncPipe

Va `subscribe` à un `Observable` et renvoyer la dernière valeur qu'il a émise. Lors de la destruction du composant, le pipe va `unsubscribe` automatiquement.

```html
<p>{{ observable$ | async }}</p>
```

## Créer un pipe personnalisé

En plus des pipes intégrés, Angular vous permet également de créer vos propres pipes personnalisés. Pour ce faire, vous pouvez utiliser le décorateur `@Pipe()` pour définir un nouveau pipe et implémenter l'interface `PipeTransform`.

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

