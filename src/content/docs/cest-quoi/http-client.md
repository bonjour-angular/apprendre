---
title: C'est quoi Http Client ?
description: C'est quoi Http Client dans Angular ?
sidebar:
  label: Http Client
---

Le `HttpClient` permet de faire des requêtes Http en GET, POST, DELETE, PUT etc. C'est donc l'outil d'Angular qui permet d'utiliser les endpoints que les devs' backend ont mis en place pour vous.

Pour pouvoir utiliser le `HttpClient`, vous devez ajouter `provideHttpClient()` dans le tableau de providers de `appConfig`. 

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
  ],
};
```

Ensuite vous pourrez faire vos requêtes http !

```typescript
import { HttpClient} from "@angular/common/http";

@Injectable()
export class TodosService {
  private readonly http = inject(HttpClient);

  getAllTodos(): Observable<Todo[]> {
    return this.http.get('api/todos');
  }

  getTodoByID(todoID: number): Observable<Todo> {
    return this.http.get(`api/todos/${todoID}`);
  }

  addTodo(todo: Todo): void {
    // le deuxième argument correspond au body
    return this.http.post(`api/todos`, {todo});
  }

  deleteTodo(todoID: number): Observable<Todo> {
    return this.http.delete(`api/todos/${todoID}`);
  }
}
```

Maintenant, vous pouvez utiliser ce service dans votre composant !

Les différentes méthodes du `HttpClient` renvoient des `Observable`, il faut donc `subscribe()` pour que cela fonctionne. Il est tout de même important de noter que par défaut les call http se `complete` lorsqu'ils sont `subscribe()` donc dans l'absolu il n'est pas nécessaire de `unsubscribe()`, mais afin d'éviter des potentiels effets de bords indésirables il est de bon ton de le faire quand même.

```typescript
@Component({
  template: `
    <ul>
      <li *ngFor="let todo of todos$ | async">
        <p>{{todo.name}}</p>
        <button (click)="delete(todo.id)">delete</button>  
      </li>
    </ul>
  `
})
export class TodosComponent {
  private readonly todosService = inject(TodosService);
  destroyRef = inject(DestroyRef);


  todos$ = this.todosService.getAllTodos();

  delete(todoID: number) {
    this.todosService.deleteTodo(todoID).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
  }
  
}
```