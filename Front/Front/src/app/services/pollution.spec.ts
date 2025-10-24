import { TestBed } from '@angular/core/testing';

import { PollutionService } from './pollution';

describe('Pollution', () => {
  let service: PollutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
