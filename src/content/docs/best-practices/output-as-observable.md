---
title: Output peut émettre un Observable
description: Output peut émettre un Observable
---

Vous connaissez certainement les `@Output()` qui permettent de faire remonter des événements de vos composants enfants vers vos composants parents.

```typescript
@Component({
  selector: 'app-button',
  template: `<button (click)="onClick()">Click me</button>`
})
export class ButtonComponent {
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
```

Mais saviez-vous que vous pouvez émettre un Observable depuis un `@Output()` ?

```typescript
@Component({...})
export class SearchComponent {
  protected readonly formGroup: FormGroup = new FormGroup({
    search: new FormControl('')
  });
  @Output() valueChanged = this.formGroup.valueChanges.pipe(
    debounceTime(200),
    map((value) => value.search),
    distinctUntilChanged()
  );
}
```

Ici, j'ai créé un `SearchComponent` qui émet un Observable `valueChanged` à chaque fois que la valeur du champ de recherche change. 

Et côté consommateur :

```typescript
@Component({
  template: `
    <app-search (valueChanged)="search.set($event)"></app-search>
    <ul>
      <li *ngFor="let product of filteredProducts$ | async">{{ product }}</li>
    </ul>
  `
})
export class ProductsListComponent {
    search = signal('');
    filteredProducts$ = toObservable(this.search).pipe(switchMap((search) => this.productsService.getProducts(search)));
}
```

C'est donc très pratique pour avoir un code réactif et DRY ! Ce n'est pas au consommateur d'implémenter la logique de debounce, filter, etc. C'est au composant `SearchComponent` de le faire, et le consommateur n'a plus qu'à consommer l'Observable `valueChanged` !