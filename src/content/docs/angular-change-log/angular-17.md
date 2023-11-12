---
title: Angular 17
description: Angular 17
sidebar:
    badge:
        text: New
        variant: caution
---

Cette liste constitue les nouveautés majeures d'Angular 16. Pour une liste complète des changements, consultez le [CHANGELOG](https://github.com/angular/angular/blob/main/CHANGELOG.md)

### Control Flow

Une toute nouvelle gestion du Control Flow est disponible. Les `*ngIf` et `*ngFor` sont remplacés par `@if` et `@for` [Pour en savoir plus.](/cest-quoi/control-flow)

### Defer

Grâce à `@defer`, nous pouvons lazy loader des morceaux de nos templates afin d'améliorer les performances de nos applications.

### Nouvel Application Builder

Vite et ESBuild sont désormais utilisés par défaut pour compiler vos applications Angular.

### SSR par défaut

Lors de la création d'une application Angular, le SSR peut désormais être activé par défaut. Aussi, le code d'Angular Universal a été merge directement sous `@angular/ssr`.

### Les signals sont stables

Les Signals sont désormais stables en version 17, vous pouvez donc les utiliser sans crainte de changements ultérieurs trop impactant.

### View transitions

Le router d’Angular supporte le nouvelle API View Transition afin que vous puissiez contrôler les animations de transitions entre les routes.