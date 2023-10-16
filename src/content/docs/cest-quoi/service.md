---
title: Service
description: C'est quoi un Service Angular ?
---

Ce sont des `class` décorées par `@Injectable()`. Elles permettent de tirer partie de la Dependency Injection qui est centrale dans Angular.

On va le plus souvent utiliser ces services dans nos composants en les injectant. Mais ils peuvent être injectés dans d'autres services, des resolvers, des guards, etc.

```ts
@Injectable({ providedIn: 'root' })
export class ProductsService {
  readonly #http = inject(HttpClient);
  readonly products: Product[] = signal([]);

  fetchAll() {
    this.#http
      .get<Product[]>(`api/products`)
      .pipe(tap((products) => this.products.set(products)))
      .subscribe();
  }

  fetchOne(id: number) {
    return this.#http.get<Product>(`api/products/${id}`);
  }

  addProduct(product: Product) {
    this.#http.post(`api/products`, product).subscribe();
  }
}

```

Puis dans un composant :

```ts
@Component({
  template: `
    <ul>
      <li *ngFor="let product of products()">
        {{product.name}}
      </li>
    </ul>
  `,
})
export class ProductsListComponent {
  #service = inject(ProductsService);
  products = this.#service.products;
}
```
