---
title: Angular 15
description: Angular 15
---

Cette liste constitue les nouveautés majeures d'Angular 15. Pour une liste complète des changements, consultez le [CHANGELOG](https://github.com/angular/angular/blob/main/CHANGELOG.md)

### L'API Standalone est stable

L'API Standalone est désormais stable et prête à être utilisée dans vos applications. Cette API vous permet de créer des composants standalone, sans avoir à utiliser de modules Angular. Cela simplifie le processus de création d'applications Angular, car vous n'avez plus besoin de créer des modules pour chaque composant que vous créez.

En outre, vous pouvez profiter d'une nouvelle syntaxe pour le routing et la configuration de vos apps.

### Composition de directives

Un nouvel attribut `hostDirectives` vous permet de définir des directives à appliquer à l'hôte d'un composant ou d'une autre directive. Cela vous permet une meilleure composabilité des directives.

### La directive pour les images est stable

La directive `ngSrc` est désormais stable. C'est une alternative à la directive `src` et permet de meilleures performances pour l'affichage des images.

### Guards fonctionnels

Les Guards fonctionnels sont désormais disponibles. Ils vous permettent de créer des Guards en utilisant des fonctions plutôt que des classes. Cela vous permet de créer des Guards plus facilement et de les réutiliser plus facilement.

### Le router supporte les class export

Vous pouvez désormais marquer vos composants comme étant exportés par défaut et les utiliser dans le router. Vous n'aurez ainsi plus besoin de faire `.then(m => m.LazyComponent)`.

### Une meilleure stack trace

Les stack traces sont désormais plus faciles à lire et à comprendre. Cela vous permet de mieux comprendre les erreurs qui se produisent dans votre application.