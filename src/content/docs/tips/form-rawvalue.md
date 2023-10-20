---
title: form.getRawValue() vs form.value
description: form.getRawValue() vs form.value
---

Il existe deux façons de récupérer les données d'un formulaire Angular :
- `this.form.value`
- `this.form.getRawValue()`

Mais ils ont des comportements différents. 

`this.form.value` retourne un objet avec les valeurs des champs du formulaire. Mais il y a un problème : il ne retourne pas les champs disabled. `this.form.getRawValue()`, lui, retourne bien les champs disabled.

```typescript
@Component({})
export class MyComponent {
  form = new FormGroup({
    name: new FormControl('emeline'),
    email: new FormControl({ value: 'emeline@gmail.com', disabled: true }),
  });

  constructor() {
    console.log(this.form.value); // { name: 'emeline' } 👈 le champ disabled est exclu
    console.log(this.form.getRawValue()); // { name: '', email: 'emeline@gmail.com' }
  }
}
```

`this.form.value` exclus les champs disabled et il est rare que ces champs là ne nous intéressent pas. Utilisez plutôt son alternative `this.form.getRawValue()` qui vous affiche bien tous les champs de vos formulaires.