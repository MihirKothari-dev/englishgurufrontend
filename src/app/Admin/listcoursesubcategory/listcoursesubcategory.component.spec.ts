import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcoursesubcategoryComponent } from './listcoursesubcategory.component';

describe('ListcoursesubcategoryComponent', () => {
  let component: ListcoursesubcategoryComponent;
  let fixture: ComponentFixture<ListcoursesubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcoursesubcategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListcoursesubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
