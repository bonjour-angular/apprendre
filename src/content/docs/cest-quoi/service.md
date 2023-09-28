---
title: Service
description: C'est quoi un Service Angular ?
---

Ce sont des `class` décorées par `@Injectable()`. Par convention leur noms se terminent par `Service`, par exemple `ProductsService`. On va le plus souvent utiliser ces services dans nos composants en les injectant. Mais ils peuvent être injectés dans d'autres services, des resolvers, des guards, etc.

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

On utilise pour plusieurs raisons :
- Mettre notre logique business
- Nos call http 
- Le state et les méthodes qui le modifie
- Des données qui peuvent être réutilisées à divers endroitstate associé. On y expose donc des méthodes qui vont être utilisées généralement dans un composant.

Exemple :
