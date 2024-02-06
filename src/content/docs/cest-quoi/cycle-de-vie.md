---
title: C'est quoi le Cycle de vie des composants ?
description: C'est quoi le Cycle de vie des composants dans Angular ?
sidebar:
  label: Cycle de vie des composants
---

:::note
Dans une version prochaine d'Angular, les composants seront `signal based`. Ce changement introduira une refonte des lifecycle hooks et une grande majorité d'entre eux seront enlevées. [Pour en savoir plus](https://github.com/angular/angular/discussions/49682)
:::

En Angular, les composants ont un cycle de vie. Cela signifie qu'il y a un moment où ils sont crées, mis à jour, détruit, etc. Tout cela est géré directement par le framework, et ils nous mettent à disposition des méthodes à utiliser directement dans les composants qui correspondent à leurs moments de vie. Ces méthodes sont appelées les lifecycle hooks.

Voici une liste des lifecycle hooks **les plus courants dans l'ordre par lequel ils sont exécutés** :

#### ngOnChanges()

Elle est appelée chaque fois qu'un ou plusieurs `@Input()` changent. Vous allez l'utiliser quand vous avez besoin de recalculer des données en fonction des changements de plusieurs `@Input()`.

```ts
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  standalone: true,
  template: `<p>{{ fullname }}</p>`,
})
export class SomeComponent implements OnChanges {
  @Input() firstname: string;
  @Input() lastname: string;

  fullname: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.firstname || changes.lastname) {
      this.fullname = `${this.firstname} ${this.lastname}`;
    }
  }
}
```

#### ngOnInit()

Cette méthode est appelée une seule fois à la création du composant. A l'intérieur du `ngOnInit` vous êtes assuré que les `@Input()` sont initialisés, vous devez donc l'utiliser si vous avez besoins des `@Input()` de votre composants.

```ts
import { Component, Input, OnInit, inject } from "@angular/core";

@Component({
  standalone: true,
  template: `<p>{{ data() }}</p>`,
})
export class AnotherComponent implements OnInit {
  #service = inject(MyService);
  @Input() userId: string;

  readonly data = this.#service.data;

  ngOnInit() {
    this.#service.fetchData(this.userId);
  }
}
```

#### ngAfterViewInit()

Cette méthode est appelée après que la vue d'un composant (et de ses enfants) a été complètement initialisée. C'est l'endroit idéal pour effectuer des manipulations liées à la vue, comme interagir avec des éléments du DOM ou utiliser `ViewChild` pour accéder à des composants ou éléments enfants.

```ts
import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  standalone: true,
  template: `
    <p #greetingMessage></p>
    <button (click)="changeMessage()">Changer le message</button>
  `,
})
export class AnotherViewComponent implements AfterViewInit {
  @ViewChild("greetingMessage") messageElement: ElementRef;

  ngAfterViewInit() {
    // Après l'initialisation de la vue, nous pouvons accéder en toute
    // sécurité à notre élément référencé.
    this.messageElement.nativeElement.innerText =
      "Bonjour depuis ngAfterViewInit!";
  }

  changeMessage() {
    this.messageElement.nativeElement.innerText = "Le message a été modifié!";
  }
}
```

Ici, nous utilisons `@ViewChild` pour accéder directement à un élément du DOM dans notre template. Ensuite, grâce à `ngAfterViewInit`, nous pouvons être sûrs que cet élément est disponible et prêt à être utilisé. Dans l'exemple, nous définissons initialement un message, puis nous fournissons un bouton pour changer ce message.

#### ngOnDestroy()

La méthode `ngOnDestroy` est appelée juste avant la destruction d'un composant ou d'une directive. C'est l'endroit idéal pour effectuer des opérations de nettoyage, comme se désabonner d'observables, annuler des requêtes HTTP en cours ou supprimer des écouteurs d'événements.

```ts
import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { DataService } from "./data.service";

@Component({
  standalone: true,
  template: `
    <h2>Some Product</h2>
    <button (click)="buy()">Buy</button>
  `,
})
export class SomeComponent implements OnDestroy {
  subscription: Subscription;

  buy() {
    this.subscription = this.dataService.buy().subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

Dans cet exemple,lorsque l'utilisateur clique sur "Buy", nous voulons effectuer une requête HTTP. Pour se faire, on doit s'abonner à un observable grâce à `.subscribe()`. Toutefois, pour éviter des fuites de mémoire, il est essentiel de s'y désabonner une fois que le composant est détruit. C'est précisément le rôle de la méthode `ngOnDestroy()` qui s'exécute juste avant la destruction du composant. Dans cette méthode, je me désouscris du flux et ainsi améliore les performances de mon application.
