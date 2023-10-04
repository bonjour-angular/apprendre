---
title: C'est quoi une Directive ?
description: C'est quoi une Directive dans Angular ?
sidebar:
  label: Directive
---

Une Directive est un Decorator disponible nativement dans Angular.

Elle permet de définir un comportement pour un élément HTML.

Par exemple, imaginons une Directive qui permet de mettre en gras un élément HTML :

```typescript
@Directive({
  selector: '[bold]'
})
export class BoldDirective {
  constructor(private elementRef: ElementRef) {
    elementRef.nativeElement.style.fontWeight = 'bold';
  }
}
```

Ici, on a une Directive qui met en gras un élément HTML. Pour cela, on injecte `ElementRef` dans le constructeur du Decorator. Cela nous permet d'accéder à l'élément HTML sur lequel on a appliqué la Directive.

Et voilà à l'utilisation :

```html
<p bold>Mon texte en gras</p>
```

Ici, on a appliqué la Directive `bold` sur un paragraphe. Cela va mettre en gras le texte du paragraphe.

## Les types de Directive

Il existe deux types de Directive :

-   Les Directives d'attribut
-   Les Directives structurelles

### Les Directives d'attribut

Les Directives d'attribut permettent de modifier le comportement d'un élément HTML en lui ajoutant des attributs.

Par exemple, imaginons une Directive qui permet de mettre en gras un élément HTML :

```typescript
@Directive({
  selector: '[bold]'
})
export class BoldDirective {
  constructor(private elementRef: ElementRef) {
    elementRef.nativeElement.style.fontWeight = 'bold';
  }
}
```

Ici, on a une Directive qui met en gras un élément HTML. Pour cela, on injecte `ElementRef` dans le constructeur du Decorator. Cela nous permet d'accéder à l'élément HTML sur lequel on a appliqué la Directive.

Et voilà à l'utilisation :

```html
<p bold>Mon texte en gras</p>
```

Ici, on a appliqué la Directive `bold` sur un paragraphe. Cela va mettre en gras le texte du paragraphe.

### Les Directives structurelles

Les Directives structurelles permettent de modifier la structure du DOM.

Par exemple, imaginons une Directive qui permet d'afficher un élément HTML en fonction d'une condition :

```typescript
@Directive({
  selector: '[if]'
})
export class IfDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  @Input() set if(condition: boolean) {
    if (condition) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
```

Ici, on a une Directive qui affiche un élément HTML en fonction d'une condition. Pour cela, on injecte `TemplateRef` et `ViewContainerRef` dans le constructeur du Decorator. Cela nous permet d'accéder au template et au container de la vue.

Et voilà à l'utilisation :

```html
<p *if="true">Mon paragraphe</p>
```

Ici, on a appliqué la Directive `if` sur un paragraphe. Cela va afficher le paragraphe si la condition est vraie.

## Les Directives natives

Angular fournit des Directives natives qui permettent de modifier le comportement d'un élément HTML.

Par exemple, imaginons une Directive qui permet de mettre en gras un élément HTML :

```html
<p [ngStyle]="{ fontWeight: 'bold' }">Mon texte en gras</p>
```

Ici, on a appliqué la Directive `ngStyle` sur un paragraphe. Cela va mettre en gras le texte du paragraphe.
