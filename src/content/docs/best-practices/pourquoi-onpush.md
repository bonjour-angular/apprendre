---
title: Pourquoi utiliser OnPush sur vos composants ?
description: Pourquoi utiliser OnPush sur vos composants ?
---

```ts
@Component({
  selector: 'app-some',
  standalone: true,
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush // 👈 je fais tout le temps ça
})
export class SomeComponent {
}
```

100% de mes composants Angular sont OnPush.

Et vous devriez en faire autant.

La raison est simple : vos applications seront plus performantes ET avec un code de meilleure qualité.

A quoi sert OnPush ? 🤔

Cela sert à lancer la détection de changement (qui détermine si les templates doivent être mis à jours) seulement dans sous conditions :
- La référence d'un @Input() a été modifiée
- Un évènement survient dans le template (clique, écrire dans un input… )
- On utilise .detectChanges() ou .markForCheck()

Donc en mettant vos composants en OnPush, votre application effectuera beaucoup moins souvent sa détection de changement, ainsi vous aurez de meilleures performances.

Mais pourquoi je parle de code de meilleure qualité ? Et bien, avec OnPush, vous êtes obligés de travailler de manière immuable et avec le pipe async ou toSignal() afin que vos templates se mettent à jours.

Si vous utilisez un .subscribe() pour assigner une propriété de votre composant, votre template ne sera pas mis à jour.

Ainsi, vous êtes forcés aux bonnes pratiques !
