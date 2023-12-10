---
title: C'est quoi Http Client ?
description: C'est quoi Http Client dans Angular ?
sidebar:
  label: Http Client
---

Le `HttpClient` permet de faire des requêtes Http en GET, POST, DELETE, PUT etc.

C'est donc l'outil d'Angular qui permet d'utiliser les endpoints que les devs' backend ont mis en place pour vous.

Pour pouvoir utiliser le `HttpClient`, vous devez ajouter `provideHttpClient()` dans le tableau de providers de `appConfig`.

```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()],
};
```

Cela a pour effet de mettre à disposition le `HttpClient` au sein de votre application entière, ainsi vous pourrez faire vos requêtes http.

```typescript
import { HttpClient } from "@angular/common/http";

@Injectable()
export class TodosService {
  private readonly http = inject(HttpClient);

  getAllTodos(): Observable<Todo[]> {
    return this.http.get("api/todos");
  }

  getTodoByID(todoID: number): Observable<Todo> {
    return this.http.get(`api/todos/${todoID}`);
  }

  addTodo(todo: Todo): void {
    // le deuxième argument correspond au body
    return this.http.post(`api/todos`, { todo });
  }

  deleteTodo(todoID: number): Observable<Todo> {
    return this.http.delete(`api/todos/${todoID}`);
  }
}
```

Les différentes méthodes du `HttpClient` renvoient des `Observable`, il faut donc `subscribe()` pour que cela fonctionne.

A noter que les call http se `complete` automatiquement lorsqu'ils sont terminés donc dans l'absolu il n'est pas nécessaire de `unsubscribe()`, mais afin d'éviter des potentiels effets de bords indésirables (requête non terminée car le composant a été détruit avant la fin du call) je vous conseille de toujours vous désabonner.

```typescript
@Component({
  template: `
    <ul>
      <li *ngFor="let todo of todos$ | async">
        <p>{{ todo.name }}</p>
        <button (click)="delete(todo.id)">delete</button>
      </li>
    </ul>
  `,
})
export class TodosComponent {
  private readonly todosService = inject(TodosService);
  destroyRef = inject(DestroyRef);

  todos$ = this.todosService.getAllTodos();

  delete(todoID: number) {
    this.todosService
      .deleteTodo(todoID)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
```
