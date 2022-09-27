import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcoursecategoryComponent } from './listcoursecategory.component';

describe('ListcoursecategoryComponent', () => {
  let component: ListcoursecategoryComponent;
  let fixture: ComponentFixture<ListcoursecategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcoursecategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListcoursecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
