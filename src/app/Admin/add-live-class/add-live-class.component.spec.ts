import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLiveClassComponent } from './add-live-class.component';

describe('AddLiveClassComponent', () => {
  let component: AddLiveClassComponent;
  let fixture: ComponentFixture<AddLiveClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLiveClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLiveClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
