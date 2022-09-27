import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbannerComponent } from './listbanner.component';

describe('ListbannerComponent', () => {
  let component: ListbannerComponent;
  let fixture: ComponentFixture<ListbannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListbannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
