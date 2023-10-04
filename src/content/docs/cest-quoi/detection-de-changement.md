---
title: C'est quoi la detection de changement ?
description: C'est quoi la detection de changement dans Angular ?
sidebar:
  label: Detection de changement
---

La détection de changement est un mécanisme qui permet de mettre à jour le DOM en fonction des changements dans le composant. Par exemple, si on a un composant qui affiche un nom, et que ce nom change, il faut mettre à jour le DOM pour afficher le nouveau nom.

En Angular, la détection de changement est automatique. Cela signifie que le framework va détecter les changements dans le composant et mettre à jour le DOM. Cela se fait grâce à la classe `ChangeDetectorRef` qui est injectée dans le composant.

Par exemple, imaginons un composant qui affiche un nom :

```ts

```