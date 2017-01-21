/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ObjectService } from './object.service';

describe('ObjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObjectService]
    });
  });

  it('should ...', inject([ObjectService], (service: ObjectService) => {
    expect(service).toBeTruthy();
  }));
});
