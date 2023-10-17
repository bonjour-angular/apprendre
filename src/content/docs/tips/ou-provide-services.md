---
title: Où provider les services ?
description: Où provider les services ?
---

Vous connaissiez peut-être déjà la variable `index` qu'on peut utiliser comme ceci :

```typescript
@Component({
  template: `
   <ul>
      <li *ngFor="let book of bookList; let index = index">
        <span>{{ index }} :</span>
        <span>{{ book.name }}</span>
      </li>
    </ul>
  `
})
export class AppComponent{}
```

Mais saviez vous qu'il en existe bien d'autres ?

```html
@Component({
  template: `
   <ul>
      <li *ngFor="
            let product of products;
            let index = index;
            let isOdd = odd;
            let isEven = even;
            let isFirst = first;
            let isLast = last"
      >
        <span>{{ index }}</span>
        <span>{{ product.name }}</span>
        <span *ngIf="isOdd">is odd</span>
        <span *ngIf="isEven">is even</span>
        <span *ngIf="isFirst">is the first product</span>
        <span *ngIf="isLast ">is the last product</span>
      </li>
    </ul>
  `
})
export class AppComponent{}
```

Cela peut être très pratique pour styliser vos listes de manière particulière par exemple !