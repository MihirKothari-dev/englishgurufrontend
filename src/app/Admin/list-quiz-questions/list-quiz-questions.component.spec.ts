import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuizQuestionsComponent } from './list-quiz-questions.component';

describe('ListQuizQuestionsComponent', () => {
  let component: ListQuizQuestionsComponent;
  let fixture: ComponentFixture<ListQuizQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListQuizQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListQuizQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
