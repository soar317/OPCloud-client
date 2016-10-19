import { Injectable } from '@angular/core';
import { inspectorConfig } from '../data/inspector.config';

const jQuery = require('jquery');
const _ = require('lodash');
const joint = require('rappid');

const Backbone = require('Backbone');
// const KeyboardJS = require('KeyboardJS');


@Injectable()
export class JointInitializerService {
  graph;
  paper;
  paperScroller;
  stencil;
  selection;
  selectionView;
  commandManager;
  inspector;
  $inspectorHolder;


  constructor() {
  }

  initMembers(layoutData) {
    _.extend(this, layoutData);
  }

  // Selection
  selectionInit() {

    this.selection = new Backbone.Collection;
    this.selectionView = new joint.ui.SelectionView({
      paper: this.paper,
      graph: this.graph,
      model: this.selection
    });

    // Initiate selecting when the user grabs the blank area of the paper while the Shift key is pressed.
    // Otherwise, initiate paper pan.
    this.paper.on('blank:pointerdown', (evt, x, y) => {

      /*if (_.contains(KeyboardJS.activeKeys(), 'shift')) {
       this.selectionView.startSelecting(evt, x, y);
       } else {*/
      this.selectionView.cancelSelection();
      this.paperScroller.startPanning(evt, x, y);
      // }
    });

    this.paper.on('cell:pointerdown', (cellView, evt) => {
      // Select an element if CTRL/Meta key is pressed while the element is clicked.
      if ((evt.ctrlKey || evt.metaKey) && !(cellView.model instanceof joint.dia.Link)) {
        this.selectionView.createSelectionBox(cellView);
        this.selection.add(cellView.model);
      }

      //https://www.jointjs.com/tutorial/hierarchy
      const cell = cellView.model;

      if (!cell.get('embeds') || cell.get('embeds').length === 0) {
        // Show the dragged element above all the other cells (except when the
        // element is a parent).
        cell.toFront();
      }

      if (cell.get('parent')) {
        this.graph.getCell(cell.get('parent')).unembed(cell);
      }
    });

    this.selectionView.on('selection-box:pointerdown', (evt) => {
      // Unselect an element if the CTRL/Meta key is pressed while a selected element is clicked.
      if (evt.ctrlKey || evt.metaKey) {
        var cell = this.selection.get(jQuery(evt.target).data('model'));
        this.selectionView.destroySelectionBox(this.paper.findViewByModel(cell));
        this.selection.reset(this.selection.without(cell));
      }
    });

    // Disable context menu inside the paper.
    // This prevents from context menu being shown when selecting individual elements with Ctrl in OS X.
    this.paper.el.oncontextmenu = (evt) => {
      evt.preventDefault();
    };

    /*    KeyboardJS.on('delete, backspace', _.bind(function (evt) {

     if (!jQuery.contains(evt.target, this.paper.el)) {
     // remove selected elements from the paper only if the target is the paper
     return;
     }

     this.commandManager.initBatchCommand();
     this.selection.invoke('remove');
     this.commandManager.storeBatchCommand();
     this.selectionView.cancelSelection();

     if (_.contains(KeyboardJS.activeKeys(), 'backspace') && !jQuery(evt.target).is("input, textarea")) {
     // Prevent Backspace from navigating back.
     evt.preventDefault();
     }

     }));*/
  }

  //  Halo, FreeTransfrom  & Inspector
  cellToolsInit() {

    this.$inspectorHolder = jQuery('.inspector-container');

    this.paper.on('cell:pointerup', (cellView) => {

      if (cellView.model instanceof joint.dia.Element && !this.selection.contains(cellView.model)) {
        this.openCellTools(cellView);
      }

      // https://www.jointjs.com/tutorial/hierarchy

      const cell = cellView.model;
      if (!cell.getBBox) return;
      
      const cellViewsBelow = this.paper.findViewsFromPoint(cell.getBBox().center());

      if (cellViewsBelow.length) {
        // Note that the findViewsFromPoint() returns the view for the `cell` itself.
        const cellViewBelow = _.find(cellViewsBelow, (c) => { 
          return c.model.id !== cell.id; 
        });

        // Prevent recursive embedding.
        if (cellViewBelow && cellViewBelow.model.get('parent') !== cell.id) {
          cellViewBelow.model.embed(cell);
        }
      }
    });
  }

  openCellTools(cellView) {

    // No need to re-render inspector if the cellView didn't change.
    if (!this.inspector || this.inspector.options.cell !== cellView.model) {

      if (this.inspector) {

        if (this.inspector.getModel().collection) {
          // update cell if the model is still in the graph
          this.inspector.updateCell();
        }

        // Clean up the old inspector if there was one.
        this.inspector.remove();
      }

      this.inspector = new joint.ui.Inspector({
        inputs: inspectorConfig.inputs || {},
        groups: inspectorConfig.groups || {},
        cell: cellView.model
      }).on('render', function() {

        this.$('[data-tooltip]').each(function() {

          var $label = jQuery(this);
          new joint.ui.Tooltip({
            target: $label,
            content: $label.data('tooltip'),
            right: '.inspector',
            direction: 'right'
          });
        });
      });

      this.$inspectorHolder.html(this.inspector.render().el);
    }

    new joint.ui.Halo({ cellView: cellView }).render();
    new joint.ui.FreeTransform({ cellView: cellView }).render();

    // adjust selection
    this.selectionView.cancelSelection();
    this.selection.reset([cellView.model]);
  }

  // Command Manager
  commandManagerInit() {

    this.commandManager = new joint.dia.CommandManager({ graph: this.graph });

    /*KeyboardJS.on('ctrl + z', function () {

     this.commandManager.undo();
     this.selectionView.cancelSelection();
     });*/

    /* KeyboardJS.on('ctrl + y', function () {

     this.commandManager.redo();
     this.selectionView.cancelSelection();
     });*/
  }

  toolTips() {

    jQuery('.toolbar-container [data-tooltip]').each(() => {

      new joint.ui.Tooltip({
        target: jQuery(this),
        content: jQuery(this).data('tooltip'),
        top: '.toolbar-container',
        direction: 'top'
      });
    });
  }

}
