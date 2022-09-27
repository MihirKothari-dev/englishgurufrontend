import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelportalComponent } from './hotelportal.component';

describe('HotelportalComponent', () => {
  let component: HotelportalComponent;
  let fixture: ComponentFixture<HotelportalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelportalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
