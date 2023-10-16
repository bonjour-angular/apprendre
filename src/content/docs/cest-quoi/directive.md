---
title: C'est quoi une Directive ?
description: C'est quoi une Directive dans Angular ?
sidebar:
  label: Directive
---

Une Directive est un attribut qui se met sur un élément HTML pour lui ajouter des comportements ou des fonctionnalités.

Vous en connaissez certaines déjà (cf. [le Control Flow](/cest-quoi/control-flow)) :
- [`*ngIf`](/cest-quoi/control-flow) 
- [`*ngFor`](/cest-quoi/control-flow) 
- [`*ngSwitch`](/cest-quoi/control-flow)
- [`ngModel`](/cest-quoi/formulaire)

Ces 3 directives sont des **directives structurelles**. Elles permettent de modifier la structure du DOM.

Mais il existe également des **directives d'attribut**. Elles changent l'apparence ou le comportement d'un élément, d'un composant ou d'une autre directive. Par exemple, `ngStyle` et `ngClass` sont des directives d'attributs qui permettent de modifier le style et les class css d'un élément, respectivement.

#### `ngClass`

```ts
@Component({
  template: `<p [ngClass]="{'text-error': isError}">Une erreur est survenue</p>`
})
export class MyComponent {
  @Input() isError = false;
}
```

Ici, la classe `text-error` sera appliquée si la propriété `isError` est `true`. A noter que vous pouvez passer plusieurs classes en même temps.

#### `ngStyle`

```ts
@Component({
  template: `<p [ngStyle]="{'color': color}">Mon texte</p>`
})
export class MyComponent {
  @Input() color = 'red';
}
```

Avec `ngStyle`, vous pouvez modifier le style d'un élément en passant un objet. Les clés de l'objet sont les noms des propriétés CSS et les valeurs sont les valeurs CSS.

### Créer une Directive

Vous pouvez créer vos propres Directives qui répondront aux besoins de votre application.

Par exemple une directive qui masquera les caractères d'une carte de crédit, sauf les 4 derniers.

```ts
import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appCreditCardMask]'
})
export class CreditCardMaskDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    let maskedValue = this.el.nativeElement.textContent;
    maskedValue.replace(/\d(?=\d{4})/g, "*");

    this.renderer.setProperty(this.el.nativeElement, 'textContent', maskedValue);
  }
}
``` 

```html
<p appCreditCardMask>1234 5678 9012 3456</p> <!-- affichera **** **** **** 3456 -->
```

#### hostDirectives

La propriété `hostDirectives` permet d'appliquer les effets d'une ou plusieurs directives sur l'élément hôte (une autre directive ou un composant). C'est donc très utile pour de la composition ! 

Par exemple, supposons que je possède ces deux directives :

```ts
// text-color.directive.ts
import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appTextColor]',
  standalone: true,
})
export class TextColorDirective {
  @Input()
  @HostBinding('style.color')
  color = 'blue';
}

// font-size.directive.ts
import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appFontSize]',
  standalone: true,
})
export class FontSizeDirective {
  @Input()
  @HostBinding('style.font-size.px')
  size = 16;
}
```

Une manière classique de les utiliser serait de les appliquer sur composant :

```ts
@Component({
  standalone: true,
  imports: [FontSizeDirective, TextColorDirective, UsernameComponent],
  template: `
    <app-username username="'john'" appTextColor appFontSize />
    <app-username username="'john'" appTextColor appFontSize size="18" color="'red'"/>
  `,
})
export class MyComponent {}
```

Mais si ces directives doivent être appliquées systématiquement sur le composant `UsernameComponent`, il est plus pratique de les appliquer directement sur le composant grâce à `hostDirectives` :

```ts
@Component({
  selector: 'app-username',
  standalone: true,
  hostDirectives: [
    {
      directive: FontSizeDirective,
      inputs: ['size'],
    },
    {
      directive: TextColorDirective,
      inputs: ['color'],
    },
  ],
  template: `<p>Hello {{username}}</p>`,
})
export class UsernameComponent {
  @Input({ required: true }) username!: string;
}
```

Et voilà ! Mes directives sont appliquées automatiquement sur la balise hôte du composant `UsernameComponent`, je n'ai donc plus besoin de les spécifier.

```ts  
@Component({
  standalone: true,
  imports: [UsernameComponent],
  template: `
    <app-username username="'john'" />
    <app-username username="'john'" size="18" color="'red'"/>
  `,
})
export class MyComponent {}
```

