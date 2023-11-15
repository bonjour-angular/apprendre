---
title: C'est quoi le Control Flow ?
description: C'est quoi le Control Flow dans Angular ?
sidebar:
  label: Control Flow
  badge:
      text: New
      variant: caution
---

:::note
Angular 17, sorti en novembre 2023, introduit une refonte totale du Control Flow. Les `*ngIf` et `*ngFor` sont remplacés par `@if` et `@for`. Dans ce document, je vous explique comment utiliser ce nouveau Control Flow.
:::

Le Control Flow, c'est le fait de contrôler dynamiquement l'affichage des éléments de nos templates.

### Conditionner avec `@if`

`@if` permet d'afficher ou non un élément en fonction d'une condition.

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
  @if (!isConnected) {
    <button>Se connecter</button>
  } @else {
    <button>Mon compte</button>
  }
</header>
```

Grâce à `@if`, j'affiche le bouton "Se connecter" si l'utilisateur n'est pas connecté et le bouton "Mon compte" si l'utilisateur est connecté.

### Boucler avec `@for`

`@for` permet de boucler sur un `Iterable` (le plus souvent un tableau) pour afficher une liste d'éléments.

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
  @for (task of tasks; track task.id) {
    <li>{{ task.title }}</li>
  } @empty {
    <li>Aucune tâche</li>
  }
</ul>
```

### Switcher avec `@switch`

`@switch` permet d'afficher un élément en fonction d'une valeur.

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
