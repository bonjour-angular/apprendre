---
title: Styliser vos composants avec host
description: Styliser vos composants avec host
---

Parfois on a besoin d'ajouter du style directement sur la balise du composant. Voici une manière non-efficace de le faire :
```html
❌ BAD
// app.component.html
// j'ajoute ma class css sur le composant manuellement
<app-product class="some-class"></app-product>
```
ou encore
```html
❌ BAD
// product.component.html
// je créé une div superflue juste pour ajouter ma class
<div class="some-class">
  ...
</div>
```

Le premier exemple n'est pas correct car cette class css n'est censé concerner que mon composant app-product, et là je me retrouve à la déclarer dans le parent, de plus si je dois changer les class, je vais devoir le faire à tous les endroits où j'ai utilisé mon app-product.
Le deuxième exemple n'est pas correct non plus car je créé une `div` supplémentaire juste pour du css, ce qui est un peu dommage.

Mais il y a bien mieux ! :point_down:

```css
// product.component.css
:host {
  padding: 1rem;
  ...
}
```

Le pseudo-selecteur `:host` va cibler la balise du composant directement (qu'on appelle le host), en l'occurrence `<app-product></app-product>`, ainsi on peut ajouter du style directement sur nos composants sans avoir à ajouter une `div` en plus ou une class css lors de l'utilisation du composant !

Si on veut ajouter des class css sur le host:
```typescript
@Component({
  selector: 'app-product',
  host: {
    class: 'p-4 bg-gray-300 flex'
  },
  template: '...'
})
```

En utilisant la propriété `host` dans l'objet du decorator `@Component`, on peut lui préciser une liste de class à ajouter sur la balise `app-product`, c'est très utile surtout si on utilise tailwindcss par exemple !
Donc là si j'utilise mon composant `<app-product> </app-product>`  lors de la compilation ça me donnera `<app-product class="p-4 bg-gray-300 flex"> </app-product>`