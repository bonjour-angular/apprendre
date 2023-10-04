---
title: C'est quoi le Control Flow ?
description: C'est quoi le Control Flow dans Angular ?
sidebar:
  label: Control Flow
---

:::note
Angular 17, sorti en novembre 2023, introduit une refonte totale du Control Flow. [Pour en savoir plus](https://blog.angular.io/meet-angulars-new-control-flow-a02c6eee7843)
:::

## *ngIf

`*ngIf` permet d'afficher ou non un élément en fonction d'une condition.

Par exemple, imaginons ce header :

```html
<header>
  <h1>Mon site</h1>
  <button>Se connecter</button>
  <button>Mon compte</button>
</header>
```

Ici, cela n'a pas de sens d'avoir le bouton de connexion et le bouton de compte en même temps. On va donc conditionner leur affichage en fonction de l'état de l'utilisateur.

```html
<header>
  <h1>Mon site</h1>
  <button *ngIf="!isConnected">Se connecter</button>
  <button *ngIf="isConnected">Mon compte</button>
</header>
```

Une autre façon d'utiliser le `*ngIf` est d'utiliser un `ng-template` :

```html
<header>
  <h1>Mon site</h1>
  <button *ngIf="!isConnected; else isNotConnected">Se connecter</button>
  <ng-template #isNotConnected>
    <button>Mon compte</button>
  </ng-template>
</header>
```

## *ngFor

`*ngFor` permet de boucler sur un tableau pour afficher une liste d'éléments.

Par exemple, imaginons une liste de tâches :

```ts
export class TasksComponent {
  tasks: Task[] = [
    {
      id: 1,
      title: 'Faire la vaisselle',
      description: 'Ne pas oublier les verres',
      done: false,
    },
    {
      id: 2,
      title: 'Faire le ménage',
      description: 'Ne pas oublier les toilettes',
      done: false,
    },
    {
      id: 3,
      title: 'Faire les courses',
      description: 'Ne pas oublier le pain',
      done: false,
    },
  ];
}
```

On peut alors afficher la liste des tâches :

```html
<ul>
  <li *ngFor="let task of tasks">
    <h2>{{ task.title }}</h2>
    <p>{{ task.description }}</p>
  </li>
</ul>
```

## *ngSwitch

`*ngSwitch` permet d'afficher un élément en fonction d'une valeur.

Par exemple, imaginons un composant `UserComponent` qui affiche un utilisateur :

```ts
export class UserComponent {
  user: User = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    age: 42,
  };
}
```

On peut alors afficher l'âge de l'utilisateur en fonction de sa valeur :

```html
<p *ngSwitch="user.age">
  <span *ngSwitchCase="18">Vous êtes majeur</span>
  <span *ngSwitchCase="42">Vous êtes la réponse à la vie, l'univers et tout le reste</span>
  <span *ngSwitchDefault>Vous avez {{ user.age }} ans</span>
</p>
```

