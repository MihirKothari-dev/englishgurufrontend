import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListuserComponent } from './listuser/listuser.component';
import { ListpaymentComponent } from './listpayment/listpayment.component';
import { ListbannerComponent } from './listbanner/listbanner.component';
import { AddbannerComponent } from './addbanner/addbanner.component';
import { ListenrollmentComponent } from './listenrollment/listenrollment.component';
import { AddenrollmentComponent } from './addenrollment/addenrollment.component';
import { AddcoursecategoryComponent } from './addcoursecategory/addcoursecategory.component';
import { ListcoursecategoryComponent } from './listcoursecategory/listcoursecategory.component';
import { ListcoursesubcategoryComponent } from './listcoursesubcategory/listcoursesubcategory.component';
import { AddcoursesubcategoryComponent } from './addcoursesubcategory/addcoursesubcategory.component';
import { ListcourseComponent } from './listcourse/listcourse.component';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { ListLessonComponent } from './list-lesson/list-lesson.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { ListQuizComponent } from './list-quiz/list-quiz.component';
import { AddQuizQuestionsComponent } from './add-quiz-questions/add-quiz-questions.component';
import { ListQuizQuestionsComponent } from './list-quiz-questions/list-quiz-questions.component';
import { QuizScoreComponent } from './quiz-score/quiz-score.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    ListuserComponent,
    ListpaymentComponent,
    ListbannerComponent,
    AddbannerComponent,
    ListenrollmentComponent,
    AddenrollmentComponent,
    AddcoursecategoryComponent,
    ListcoursecategoryComponent,
    ListcoursesubcategoryComponent,
    AddcoursesubcategoryComponent,
    ListcourseComponent,
    AddcourseComponent,
    AddLessonComponent,
    ListLessonComponent,
    AddQuizComponent,
    ListQuizComponent,
    AddQuizQuestionsComponent,
    ListQuizQuestionsComponent,
    QuizScoreComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
  ]
})
export class AdminModule { }
