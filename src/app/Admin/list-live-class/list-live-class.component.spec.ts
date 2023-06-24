import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLiveClassComponent } from './list-live-class.component';

describe('ListLiveClassComponent', () => {
  let component: ListLiveClassComponent;
  let fixture: ComponentFixture<ListLiveClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLiveClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLiveClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
