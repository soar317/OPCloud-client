import { Component, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { RappidLayoutService } from '../shared/services/rappid-layout.service';

@Component({
  selector: 'app-rappid-paper',
  styleUrls: ['./rappid-paper.component.css'],
  template: `
    <div class="paper-container" #paperContainer></div>
  `,
})
export class RappidPaperComponent implements AfterViewInit{
  @ViewChild('paperContainer', { read: ViewContainerRef }) paperContainer;

  constructor(private rappidLayout: RappidLayoutService) {
  }

  ngAfterViewInit() {
    this.paperContainer.element.nativeElement.appendChild(this.rappidLayout.getPaperScroller());
  }

}
