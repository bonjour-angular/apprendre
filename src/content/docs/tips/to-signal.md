---
title: Migrer vers les Signal avec toSignal()
description: Migrer vers les Signal avec toSignal()
sidebar:
    badge:
        text: New
        variant: caution
---

Il est SUPER facile d'adopter les Signals dès aujourd'hui dans vos applications Angular 16+.

Il suffit d'utiliser toSignal().

```ts
@Component({
  standalone: true,
  template: `
    <ul>
      <li *ngFor="let todo of todos()">
        {{todo.title}}
      </li>
    <ul>
  `,
})
export class TodosComponent {
  http = inject(HttpClient);
  todos = toSignal(this.http.get('https://jsonplaceholder.typicode.com/todos'))
}
```

Cette fonction, dispo depuis la version 16, accepte un Observable en argument pour le caster en Signal. Il ne vous reste plus qu'à utiliser votre Signal dans le template par exemple.

Le bonus : l'Observable est automatiquement unsubscribe au destroy du contexte !