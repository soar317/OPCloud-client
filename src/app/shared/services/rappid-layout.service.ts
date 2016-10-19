import { Injectable } from '@angular/core';
import { stencilConfig } from '../data/stencil.config';
const _ = require('lodash');
const joint = require('rappid');
import { JointInitializerService } from './joint-initializer.service';

@Injectable()
export class RappidLayoutService {
  graph;
  paper;
  paperScroller;
  stencil;
  inspector;
  selection;
  selectionView;

  constructor(private jointInitializer: JointInitializerService) {
    this.graph = new joint.dia.Graph;

    this.initPaper();
    this.initPaperScroller();
    this.initStencil();
    this.jointInitializer.initMembers({
      paper: this.paper,
      graph: this.graph
    });
    this.initCellTools();
    this.initSelection();
  }

  initPaper() {
    this.paper = new joint.dia.Paper({
      width: 2000,
      height: 2000,
      gridSize: 10,
      perpendicularLinks: true,
      model: this.graph,
      markAvailable: true,
      defaultLink: new joint.dia.Link({
        attrs: {
          '.marker-source': { d: 'M 10 0 L 0 5 L 10 10 z', transform: 'scale(0.001)' },
          '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' },
          '.connection': {}
        }
      })
    });
  }

  initPaperScroller() {
    this.paperScroller = new joint.ui.PaperScroller({
      paper: this.paper,
      autoResizePaper: true,
      padding: 50
    });
  }

  initStencil() {
    console.log('init stencil')

    this.stencil = new joint.ui.Stencil({
      graph: this.graph,
      paper: this.paper,
      width: stencilConfig.width,
      groups: stencilConfig.groups,
      search: stencilConfig.search
    }).on('filter', this.layout.bind(this));
  }
  
  addShapesToStencil(shapes, groupName) {
    this.stencil.load(shapes, groupName);
    this.layout(this.stencil.getGraph(groupName));
    this.stencil.getPaper(groupName).fitToContent(1, 1, 10);
  }

  layout(graph) {
    joint.layout.GridLayout.layout(graph, {
      columnWidth: this.stencil.options.width / 2 - 10,
      columns: 2,
      rowHeight: 75,
      dy: 5,
      dx: 5,
      resizeToFit: true
    });
  }

  getPaper() {
    return this.paper.el;
  }

  getPaperScroller() {
    return this.paperScroller.el;
  }
  
  getStencil() {
    return this.stencil.render().el;
  }

  initCellTools() {
    this.jointInitializer.cellToolsInit();
  }

  initSelection() {
    this.jointInitializer.selectionInit();

  }
}
