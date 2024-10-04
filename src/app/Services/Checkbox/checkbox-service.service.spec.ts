import { TestBed } from '@angular/core/testing';

import { CheckboxServiceService } from './checkbox-service.service';

describe('CheckboxServiceService', () => {
  let service: CheckboxServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckboxServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
