import { Injectable } from '@angular/core';
import { opmShapesConfig } from '../data/opm-shapes.config';
const joint = require('rappid');

@Injectable()
export class OpmShapesService {

  initOpmShapes() {
    return [this.initProcessShape()];
  }

  initProcessShape() {
    return this.initShape(opmShapesConfig.things.process);
  }
  
  initShape(opmShapeConfig) {
    const Shape =  joint.shapes.basic[opmShapeConfig.jointBasicShape].extend({
      defaults: joint.util.deepSupplement(
        opmShapeConfig.supplement,
        joint.shapes.basic[opmShapeConfig.jointBasicShape].prototype.defaults)
    });
    const shape = new Shape;
    return shape;
  }
}
