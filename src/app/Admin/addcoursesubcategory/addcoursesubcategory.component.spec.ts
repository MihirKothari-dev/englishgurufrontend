import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcoursesubcategoryComponent } from './addcoursesubcategory.component';

describe('AddcoursesubcategoryComponent', () => {
  let component: AddcoursesubcategoryComponent;
  let fixture: ComponentFixture<AddcoursesubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcoursesubcategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcoursesubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
