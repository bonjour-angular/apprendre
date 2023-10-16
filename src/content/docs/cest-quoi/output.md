---
title: C'est quoi @Output ?
description: C'est quoi @Output dans Angular ?
sidebar:
  label: Output
---

`@Output()` est utilisé pour permettre à un composant enfant de communiquer avec son composant parent en envoyant des événements. Le décorateur `@Output()` est souvent utilisé avec `EventEmitter` pour émettre des événements personnalisés que le composant parent peut écouter et réagir.

```typescript
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <button (click)="sendEvent()">Click me</button>
  `
})
export class ChildComponent {
  @Output() customEvent = new EventEmitter<string>();
  
  sendEvent() {
    this.customEvent.emit('Hello Parent!');
  }
}

@Component({
  selector: 'app-parent',
  standalone: true,
  template: `
    <app-child (customEvent)="handleEvent($event)"></app-child>
  `,
  imports: [ChildComponent]
})
export class ParentComponent {
  
  handleEvent(event: string) {
    console.log(event);  // Affiche 'Hello Parent!' dans la console
  }
}
```

Ici, dès que l'utilisateur aura cliqué sur le bouton du composant enfant, le composant parent recevra l'événement et pourra réagir en conséquence. `$event` correspond à la valeur passée dans `emit()`.

Vous pouvez aussi émettre directement un `Observable` :

```typescript
import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <input type="text" [formControl]="search"  />
  `,
})
export class ChildComponent {
  search = new FormControl('');

  @Output() searched = this.search.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
  );
}
```