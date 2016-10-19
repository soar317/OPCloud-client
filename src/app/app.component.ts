import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>    
    <app-rappid-main></app-rappid-main>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'OPCloud';
}
