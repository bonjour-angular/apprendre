---
title: C'est quoi le Cycle de vie des composants ?
description: C'est quoi le Cycle de vie des composants dans Angular ?
sidebar:
  label: Cycle de vie des composants
---

:::note
Dans une version prochaine d'Angular, les composants seront `signal based`. Ce changement introduira une refonte des lifecycle hooks et une grande majorité d'entre eux seront enlevés. [Pour en savoir plus](https://github.com/angular/angular/discussions/49682)
:::

En Angular, les composants ont un cycle de vie. Cela signifie qu'il y a un moment où ils sont crées, mis à jour, détruit, etc. Tout cela est géré directement par le framework, et ils nous mettent à disposition des méthodes à utiliser directement dans les composants. Ces méthodes sont appelées les lifecycle hooks.

Voici une liste des lifecycle hooks **dans l'ordre par lequel ils sont exécutés** :

## ngOnChanges()
- Appelé avant `ngOnInit()` et chaque fois qu'un `@Input()` change.
- Utilisé pour réagir aux changements sur les propriétés `@Input()` du composant.

## ngOnInit()
- Appelé une fois que le composant est initialisé et après le premier appel de `ngOnChanges()`.
- Dans le `ngOnInit()`, les propriétés `@Input()` sont définies.

## ngDoCheck()
- Appelé lors de chaque cycle de détection des changements, immédiatement après `ngOnChanges()` et `ngOnInit()`.
- Vous n'allez pas souvent utiliser cette méthode mais elle est utile pour savoir quand un changement a été détecté.

## ngAfterContentInit()
- Appelé une fois que du contenu est projeté dans le template du composant (typiquement via `<ng-content>`)
- Utilisé pour mettre à jour des données du composant projeté dans le template ou n'importe quelle action à effectuer après l'initialisation du contenu.

## ngAfterContentChecked()
- Appelé après chaque détection de changement du composant et de ses projections.
- Permet d'implémenter tout besoin additionnel qui nécessite l'initialisation complètement du composant et de ses projections.

## ngAfterViewInit()
- Appelé une fois que les `view` du composant ont été initialisées.
- Souvent utilisé en combinaison avec `@ViewChild()` pour accéder aux éléments du template.

## ngAfterViewChecked()
- Appelé après chaque vérification des `view` du composant
- Souvent utilisé en combinaison avec `@ViewChildren()` pour accéder aux éléments du template.

## ngOnDestroy()
- Appelé juste avant que le composant soit détruit.
- Utilisé pour effectuer du nettoyage ou des actions avant la destruction du composant, comme se désabonner des observables ou détacher des événements.
