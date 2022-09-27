import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenrollmentComponent } from './listenrollment.component';

describe('ListenrollmentComponent', () => {
  let component: ListenrollmentComponent;
  let fixture: ComponentFixture<ListenrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListenrollmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListenrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
