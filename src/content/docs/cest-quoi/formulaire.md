---
title: C'est quoi les Formulaires ?
description: C'est quoi les Formulaires dans Angular ?
sidebar:
  label: Formulaire
---

Dans Angular, il existe deux types de formulaires :

- Les formulaires réactifs
- Les formulaires template-driven

Bien que les deux types de formulaires permettent de faire la même chose, leurs utilisations diffèrent et ont des avantages et des inconvénients.

### Les formulaires réactifs (ReactiveFormsModule)

Le principe des formulaires réactifs est de créer un objet qui représente le formulaire. Cet objet est ensuite lié à un `<form>` dans le template.

Par exemple, imaginons un formulaire qui permet de créer un utilisateur :

```ts
import { Component } from "@angular/core";
import { FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";

@Component({
  standalone: true,
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div>
        <label for="name">Nom</label>
        <input type="text" id="name" formControlName="name" />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" formControlName="email" />
      </div>
      <button type="submit">Envoyer</button>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class UserFormComponent {
  protected readonly form = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  onSubmit() {
    if (this.form.valid) {
      // Envoi du formulaire
    }
  }
}
```

La première étape consiste à importer `ReactiveFormsModule`, cela permet d'avoir accès aux directives `formGroup` et `formControlName` et également d'ajouter l'event `ngSubmit` sur le `<form>`.

Ensuite, il faut créer un objet `FormGroup` qui représente le formulaire. Cet objet est composé de plusieurs `FormControl` qui représentent les champs du formulaire avec leurs valeurs initiales et leurs validateurs.

Enfin, il faut lier le `FormGroup` au `<form>` avec la directive `formGroup` et chaque `FormControl` aux champs du formulaire avec la directive `formControlName`.

Maintenant, il ne me reste plus qu'à soumettre le formulaire en appelant la méthode `onSubmit()` lorsque le formulaire est valide.

### Les formulaires template-driven (FormsModule)

Les formulaires template-driven, eux, sont entièrement gérés par le template.

Par exemple, imaginons un formulaire qui permet de créer un utilisateur :

```ts
import { Component } from "@angular/core";
import { NgForm, FormsModule } from "@angular/forms";

@Component({
  standalone: true,
  template: `
    <form (ngSubmit)="onSubmit()">
      <div>
        <label for="name">Nom</label>
        <input
          type="text"
          id="name"
          name="name"
          [(ngModel)]="user.name"
          required
        />
      </div>
      <div>
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          [(ngModel)]="user.email"
          required
          email
        />
      </div>
      <button type="submit">Envoyer</button>
    </form>
  `,
  imports: [FormsModule],
})
export class UserFormComponent {
  user = {
    name: "",
    email: "",
  };

  onSubmit() {
    if (user.name && user.email) {
      // Envoi du formulaire
      console.log(this.user);
    }
  }
}
```

Tout comme pour les formulaires réactifs, il faut importer `FormsModule` pour avoir accès aux directives `ngForm`, `ngModel` et `ngSubmit`.
Mais tout le reste est très différent.

Ici, l'intelligence du formulaire est entièrement pilotée par le template, c'est à dire que les champs sont reliés au formulaire grâce à la directive `ngModel` et le formulaire est lié à une variable locale (`#form`) avec la directive `ngForm` que nous passons en paramètre de `onSubmit`. Egalement, les validateurs sont passés en attributs des champs.

### ReactiveFormsModule vs FormsModule

C'est un grand débat ! Généralement lorsque vous commencez à utiliser Angular, vous utilisez les formulaires template-driven car ils sont plus simples à mettre en place. Mais plus tard, on vous recommande d'utiliser les formulaires réactifs car ils sont plus puissants et plus flexibles.

Et un jour vous tombez sur des articles ou vidéos de [Ward Bell](https://www.youtube.com/watch?v=L7rGogdfe2Q&t=3s&ab_channel=ng-conf), [Tim Deschryver](https://timdeschryver.dev/blog/a-practical-guide-to-angular-template-driven-forms) ou encore [Brecht Billiet](https://blog.simplified.courses/template-driven-forms-with-form-arrays/) qui prêchent pour l'utilisation des templates driven forms. Et là, vous ne savez plus quoi faire !

Ce que je recommande, c'est déjà d'expérimenter les deux façons de faire pour bien ressentir le feeling d'utilisation de chacun.

Ma préférence personnelle va légèrement pour les templates driven forms, surtout en combinaison avec les [Signal](/cest-quoi/signal). On obtient sensiblement le même résultat qu'avec les reactive forms mais avec moins de code et plus de simplicité.

Il est à parier que lorsque l'API des formulaires seront revisitées par l'équipe d'Angular (car cela arrivera), la solution sera plus proche de la solution des templates driven forms que des reactive forms.
