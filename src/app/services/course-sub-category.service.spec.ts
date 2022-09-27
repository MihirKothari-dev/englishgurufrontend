import { TestBed } from '@angular/core/testing';

import { CourseSubCategoryService } from './course-sub-category.service';

describe('CourseSubCategoryService', () => {
  let service: CourseSubCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseSubCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
