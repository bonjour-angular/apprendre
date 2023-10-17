---
title: Service
description: C'est quoi un Service Angular ?
---

Ce sont des `class` décorées par `@Injectable()`. Elles permettent de tirer partie de la Dependency Injection qui est centrale dans Angular.

On va le plus souvent utiliser ces services dans nos composants en les injectant. Mais ils peuvent être injectés dans d'autres services, des resolvers, des guards, etc.

### Créer un service

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

Un service contient généralement un state et des méthodes pour le modifier et/ou pour effectuer des appels HTTP.

### Utiliser un service

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

Un service s'injecte dans un composant via la fonction `inject` qui prend en paramètre la classe du service à injecter. Cependant, cela ne fonctionne que si le service est "providé" (mis à disposition) dans le scope de là où il est injecté. [Pour en savoir plus](/tips/ou-provide-services).