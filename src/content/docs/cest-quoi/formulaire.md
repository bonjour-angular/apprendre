---
title: C'est quoi les Formulaires ?
description: C'est quoi les Formulaires dans Angular ?
sidebar:
  label: Formulaire
---

Un formulaire est un ensemble de champs qui permettent de collecter des données. Dans Angular, il existe deux types de formulaires :

-   Les formulaires réactifs
-   Les formulaires template-driven

## Les formulaires réactifs

Les formulaires réactifs sont des formulaires qui sont créés à l'aide de la classe `FormGroup`. Cette classe permet de créer un groupe de champs qui peuvent être validés et soumis.

Par exemple, imaginons un formulaire qui permet de créer un utilisateur :

```ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // Envoi du formulaire
    }
  }
}
```

## Les formulaires template-driven

Les formulaires template-driven sont des formulaires qui sont créés à l'aide de directives. Ces directives permettent de créer un groupe de champs qui peuvent être validés et soumis.

Par exemple, imaginons un formulaire qui permet de créer un utilisateur :

```html
<form #form="ngForm" (ngSubmit)="onSubmit()">
  <div>
    <label for="name">Nom</label>
    <input type="text" id="name" name="name" ngModel required />
  </div>
  <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" ngModel required email />
  </div>
  <button type="submit">Envoyer</button>
</form>
```
