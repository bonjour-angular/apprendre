---
title: Angular 16
description: Angular 16
---

Cette liste constitue les nouveautés majeures d'Angular 16. Pour une liste complète des changements, consultez le [CHANGELOG](https://github.com/angular/angular/blob/main/CHANGELOG.md)

### Signals

Les Signals permettent de définir des valeurs réactives très facilement. Ils sont plus simples à utiliser que les Observables et, à terme, vont permettre de meilleures performances. [Pour en savoir plus.](/cest-quoi/signal)

### Server-Side Rendering et hydratation

Angular a revu sa façon de gérer le SSR et l'hydratation au sein des applications. Grâce à ces modifications, le SSR offre une meilleure expérience utilisateur et met en place une base solide pour les futures améliorations.

### Vite et ESBuild

Désormais lorsque vous utilisez `ng serve`, Angular utilise Vite et ESBuild pour compiler votre application. Cela permet d'avoir des temps de compilation plus rapides et une meilleure expérience de développement.

### Jest

Jest est désormais disponible en tant que framework de test pour Angular. Il vous suffit de l'installer et de l'utiliser pour vos tests en ajoutant `"builder": "@angular-devkit/build-angular:jest"` dans le fichier `angular.json`.

### @Input() requis

Vous pouvez désormais définir un `@Input()` comme étant requis grâce à `@Input({required: true})`. Cela permet de s'assurer que la valeur est bien définie et de faciliter la maintenance de votre code.

### @Input() pour récupérer les paramètres d'une route

`@Input()` peut maintenant récupérer les données de la route (paramètres du path, query, data, ou du resolver). Pour activer cette option, il faut ajouter `withComponentInputBinding` dans le `provideRouter`.

### DestroyRef

`DestroyRef` est une nouvelle classe qui permet de définir des actions à effectuer lorsqu'un composant est détruit. Cela permet de mieux gérer la mémoire et d'éviter les fuites de mémoire.

### Balises auto-fermantes

Les balises auto-fermantes sont désormais supportées. Vous pouvez ainsi utiliser vos composants ainsi : `<my-component />`.