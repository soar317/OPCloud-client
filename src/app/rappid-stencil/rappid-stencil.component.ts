import { Component, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { RappidLayoutService } from '../shared/services/rappid-layout.service';
import { OpmShapesService } from '../shared/services/opm-shapes.service';

@Component({
  selector: 'app-rappid-stencil',
  styleUrls: ['./rappid-stencil.component.css'],
  template: `
    <div class="stencil-container" #stencilContainer>
      <label>Stencil</label>
      <button class="btn-expand" title="Expand all" ng-click="stencil.openGroups()">
        <i class="fa fa-plus-circle"></i>
      </button>
      <button class="btn-collapse" title="Collapse all" ng-click="stencil.closeGroups()">
        <i class="fa fa-minus-circle"></i>
      </button>
    </div>
  `,
})
export class RappidStencilComponent implements AfterViewInit {
  @ViewChild('stencilContainer', { read: ViewContainerRef }) stencilContainer;

  constructor(private rappidLayout: RappidLayoutService, private opmShapesService: OpmShapesService) {
  }

  ngAfterViewInit() {
    this.stencilContainer.element.nativeElement.appendChild(this.rappidLayout.getStencil());
    let shapes = this.opmShapesService.initOpmShapes();
    this.rappidLayout.addShapesToStencil(shapes, 'main');
  }
  
}
