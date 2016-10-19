/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OpmShapesService } from './opm-shapes.service';

describe('Service: OpmShapes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpmShapesService]
    });
  });

  it('should ...', inject([OpmShapesService], (service: OpmShapesService) => {
    expect(service).toBeTruthy();
  }));
});
