import { TestBed } from '@angular/core/testing';

import { SliderMenuService } from './slider-menu.service';

describe('SliderMenuService', () => {
  let service: SliderMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SliderMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
