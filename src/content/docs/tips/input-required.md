---
title: Rendre obligatoire les @Input()
description: Utilisez 'default' pour avoir un routing plus simple
---

C'est arrivé en **version 16**, vos @Input() peuvent désormais être marqué comme étant required !

```ts
@Component({
  selector: 'app-button',
  standalone: true,
  template: `<button [class]="theme" >{{text}}</button>`
})
export class ButtonComponent {
  @Input({required: true}) text: string;
  @Input() theme: Theme = 'primary'
}

@Component({
  standalone: true,
  import: [ButtonComponent],
  template: `<app-button text="click me" />`
})
export class SomeComponent{}
```

Ici, j'ai créé un `ButtonComponent` ayant une propriété `text` en required . Si j'oublie de le mettre lors de l'utilisation de mon composant, le compilateur lèvera une erreur !