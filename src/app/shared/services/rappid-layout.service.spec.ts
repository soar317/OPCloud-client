/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RappidLayoutService } from './rappid-layout.service';

describe('Service: RappidLayout', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RappidLayoutService]
    });
  });

  it('should ...', inject([RappidLayoutService], (service: RappidLayoutService) => {
    expect(service).toBeTruthy();
  }));
});
