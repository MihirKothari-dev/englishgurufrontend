import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcoursecategoryComponent } from './addcoursecategory.component';

describe('AddcoursecategoryComponent', () => {
  let component: AddcoursecategoryComponent;
  let fixture: ComponentFixture<AddcoursecategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcoursecategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcoursecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
