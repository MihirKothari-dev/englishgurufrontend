import { TestBed } from '@angular/core/testing';

import { LessionService } from './lession.service';

describe('LessionService', () => {
  let service: LessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
