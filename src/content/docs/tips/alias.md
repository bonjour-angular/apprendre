---
title: Utiliser des alias pour vos imports
description: Utiliser des alias pour vos imports
---

On a tous vu ce genre d'import dans nos fichiers :

```ts
import { Something } from '../../../../../../something.ts';
```

Vous pouvez éviter cela en utilisant les alias dans le `tsconfig.json` via l'attributs `paths` :

```ts
// tsconfig.json

{
  "compilerOptions": {
    ...
    "paths": {
      "@project/components": ["src/app/components/index.ts"],
      "@project/routes": ["src/app/routes/index.ts"],
      "@project/shared/*": ["src/app/shared/*"],       
    }
  }
}

```

Ainsi, vous pourrez utiliser ces alias pour importer vos ressources :

```ts
import { ButtonComponent, CardComponent } from '@project/components';
import { formatText } from '@project/shared/utils/formatting';
import { converting } from '@project/shared/utils/converting';
```

C'est une chose à faire pour plusieurs raisons :

- C'est bien plus facile à lire que des paths relatifs
- C'est utile pour le refactoring : si votre code change d'endroit l'import reste le même
- Les IDE arrivent à importer directement depuis les alias