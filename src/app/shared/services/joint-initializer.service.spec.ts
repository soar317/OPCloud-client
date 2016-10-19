/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JointInitializerService } from './joint-initializer.service';

describe('Service: JointInitializer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JointInitializerService]
    });
  });

  it('should ...', inject([JointInitializerService], (service: JointInitializerService) => {
    expect(service).toBeTruthy();
  }));
});
