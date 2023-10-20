---
title: C'est quoi le Control Flow ?
description: C'est quoi le Control Flow dans Angular ?
sidebar:
  label: Control Flow
---

:::note
Angular 17, sorti en novembre 2023, introduit une refonte totale du Control Flow. [Pour en savoir plus.](https://blog.angular.io/meet-angulars-new-control-flow-a02c6eee7843)
:::

Le Control Flow, c'est le fait de contrôler dynamiquement l'affichage des éléments de nos templates.

### Conditionner avec *ngIf

`*ngIf` permet d'afficher ou non un élément en fonction d'une condition.

Par exemple, imaginons ce header :

```html
<header>
  <h1>Mon site</h1>
  <button>Se connecter</button>
  <button>Mon compte</button>
</header>
```

Ici, cela n'a pas de sens d'avoir le bouton de connexion et le bouton "mon compte" en même temps. On va donc conditionner leur affichage en fonction de l'état de l'utilisateur.

```html
<header>
  <h1>Mon site</h1>
  <button *ngIf="!isConnected">Se connecter</button>
  <button *ngIf="isConnected">Mon compte</button>
</header>
```

Grâce à `*ngIf`, j'affiche le bouton "Se connecter" si l'utilisateur n'est pas connecté et le bouton "Mon compte" si l'utilisateur est connecté.

Une autre façon d'utiliser le `*ngIf` est d'utiliser un `ng-template` afin d'utiliser le `else`:

```html
<header>
  <h1>Mon site</h1>
  <button *ngIf="!isConnected; else isNotConnected">Se connecter</button>
  <ng-template #isNotConnected>
    <button>Mon compte</button>
  </ng-template>
</header>
```

Depuis Angular 17, il est possible d'utiliser la syntaxe suivante :

```html
<header>
  <h1>Mon site</h1>
  @if(!isConnected) {
    <button>Se connecter</button>
  } @else {
    <button>Mon compte</button>
  }
</header>
```

### Boucler avec *ngFor

`*ngFor` permet de boucler sur un `Iterable` (le plus souvent un tableau) pour afficher une liste d'éléments.

Par exemple, imaginons une liste de tâches :

```ts
export class TasksComponent {
  tasks: Task[] = [
    {
      id: 1,
      title: 'Apprendre Angular',
      done: true,
    },
    {
      id: 2,
      title: 'Rejoindre le Discord de Bonjour Angular',
      done: true,
    },
    {
      id: 3,
      title: 'Centrer une div',
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
  </li>
</ul>
```

Depuis Angular 17, il est possible d'utiliser la syntaxe suivante :

```html
<ul>
  @for (task of tasks; track task.id) {
    <li>
      <h2>{{ task.title }}</h2>
    </li>
  }
</ul>
```

### Switcher avec *ngSwitch

`*ngSwitch` permet d'afficher un élément en fonction d'une valeur.

Par exemple, imaginons un composant `UserComponent` qui affiche un utilisateur :

```ts
export class UserComponent {
  user: User = {
    id: 1,
    role: 'teacher',
  };
}
```

On peut alors afficher l'âge de l'utilisateur en fonction de sa valeur :

```html
<p *ngSwitch="user.role">
  <span *ngSwitchCase="'student'">Vous êtes un.e étudiant.e</span>
  <span *ngSwitchCase="'teacher'">Vous êtes un.e enseignant.e</span>
  <span *ngSwitchCase="'director'">Vous êtes un.e directeur.rice</span>
  <span *ngSwitchDefault>Vous êtes un.e inconnu.e</span>
</p>
```

Depuis Angular 17, il est possible d'utiliser la syntaxe suivante :

```html
<p>
  @switch (user.role) {
    @case('student') {
      <span>Vous êtes un.e étudiant.e</span>
    }
    @case('teacher') {
      <span>Vous êtes un.e enseignant.e</span>
    }
    @case('director') {
      <span>Vous êtes un.e directeur.rice</span>
    }
    @default {
      <span>Vous êtes un.e inconnu.e</span>
    }
  }
</p>
