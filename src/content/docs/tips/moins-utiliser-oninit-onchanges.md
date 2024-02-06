---
title: Moins utiliser OnInit et OnChanges
description: Moins utiliser OnInit et OnChanges
---

Je n'utilise presque jamais ngOnInit ou ngOnChanges dans mes composants Angular.

D'ailleurs, savez-vous à quoi ils servent exactement ?

- Lorsque OnInit s'exécute, les inputs sont définis
- OnChanges s'exécute à chaque fois qu'un input change

Je vois souvent des devs qui utilisent ces hooks pour définir des propriétés.

Ce n'est pas nécessaire. ❌

- 👉 Si vous n'avez pas besoin de la donnée d'un input, définissez votre propriété dès son initialisation
- 👉 Si vous avez besoin de la donnée d'un input, utilisez le setter de l'input (ou la nouvelle propriété transform)

Votre code sera moins verbeux et plus déclaratif !

```typescript
// ❌ Utilisation superflux de OnInit et OnChanges

@Component({
  selector: "app-user-details",
  standalone: true,
  template: `
    <p>{{ user().name }}</p>
    <p>{{ someData }}</p>
  `,
})
export class UserDetailsComponent implements OnInit, OnChanges {
  #service = inject(UserService);
  someData!: SomeData;
  user = signal<User>({} as User);

  @Input()
  userId!: number;

  ngOnInit() {
    this.someData = this.#service.someData;
  }

  ngOnChanges() {
    this.user.set(this.#service.getUserDetails(this.userId));
  }
}
```

```typescript
// ✅ On se sert uniquement du setter de l'input

@Component({
  selector: "app-user-details",
  standalone: true,
  template: `
    <p>{{ user().name }}</p>
    <p>{{ someData }}</p>
  `,
})
export class UserDetailsComponent {
  #service = inject(UserService);
  someData = this.#service.someData;
  user = signal<User>({} as User);

  @Input()
  set userId(userId: number) {
    this.user.set(this.#service.getUserDetails(userId));
  }
}
```
