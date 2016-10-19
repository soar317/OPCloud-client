import { Component } from '@angular/core';

@Component({
  selector: 'app-rappid-main',
  template: `
    <div class="rappid">
      <app-rappid-toolbar></app-rappid-toolbar>
      <app-rappid-stencil></app-rappid-stencil>
      <app-rappid-paper></app-rappid-paper>
      <div class="inspector-container"></div>
      <div class="statusbar-container"></div>
    </div>
  `
})
export class RappidMainComponent {}
