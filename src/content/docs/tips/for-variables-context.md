---
title: Les variables de contexte de @for
description: Les variables de contexte de @for
sidebar:
    badge:
        text: New
        variant: caution
---

Vous connaissiez peut-être déjà la variable `index` qu'on peut utiliser comme ceci :

```typescript
@Component({
  template: `
    <ul>
      @for (book of bookList; track book.id) {
        <li>Book #{{ $index }}: {{ book.name }}</li>
      }
    </ul>
  `
})
export class AppComponent{}
```

Mais saviez vous qu'il en existe bien d'autres ?

```ts
@Component({
  template: `
    <ul>
      @for (product of products; track product.id) {
        <li>
          <span>index: {{ $index }}</span>
          <span>total number: {{ $count }}</span>
          <span>is odd: {{ $odd }}</span>
          <span>is even: {{ $even }}</span>
          <span>is the first product: {{ $first }}</span>
          <span>is the last product: {{ $last }}</span>
        </li>
      }
    </ul>
  `
})
export class AppComponent{}
```

Cela peut être très pratique pour styliser vos listes de manière particulière par exemple !