import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLessonComponent } from './Admin/add-lesson/add-lesson.component';
import { AddQuizQuestionsComponent } from './Admin/add-quiz-questions/add-quiz-questions.component';
import { AddQuizComponent } from './Admin/add-quiz/add-quiz.component';
import { AddbannerComponent } from './Admin/addbanner/addbanner.component';
import { AddcourseComponent } from './Admin/addcourse/addcourse.component';
import { AddcoursecategoryComponent } from './Admin/addcoursecategory/addcoursecategory.component';
import { AddcoursesubcategoryComponent } from './Admin/addcoursesubcategory/addcoursesubcategory.component';
import { AddenrollmentComponent } from './Admin/addenrollment/addenrollment.component';
import { ListLessonComponent } from './Admin/list-lesson/list-lesson.component';
import { ListQuizQuestionsComponent } from './Admin/list-quiz-questions/list-quiz-questions.component';
import { ListQuizComponent } from './Admin/list-quiz/list-quiz.component';
import { ListbannerComponent } from './Admin/listbanner/listbanner.component';
import { ListcourseComponent } from './Admin/listcourse/listcourse.component';
import { ListcoursecategoryComponent } from './Admin/listcoursecategory/listcoursecategory.component';
import { ListcoursesubcategoryComponent } from './Admin/listcoursesubcategory/listcoursesubcategory.component';
import { ListenrollmentComponent } from './Admin/listenrollment/listenrollment.component';
import { ListpaymentComponent } from './Admin/listpayment/listpayment.component';
import { ListuserComponent } from './Admin/listuser/listuser.component';
import { QuizScoreComponent } from './Admin/quiz-score/quiz-score.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminportalComponent } from './layouts/adminportal/adminportal.component';
import { HotelportalComponent } from './layouts/hotelportal/hotelportal.component';
import { LoginlayoutComponent } from './layouts/loginlayout/loginlayout.component';
import { ForgetPasswordComponent } from './login/forget-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { SignInComponent } from './login/sign-in.component';
import { ListLiveClassComponent } from './Admin/list-live-class/list-live-class.component';
import { AddLiveClassComponent } from './Admin/add-live-class/add-live-class.component';

const routes: Routes = [
  {
    path: "", redirectTo: "/login", pathMatch:"full"
  },
  {
    path: "login", component: LoginlayoutComponent, children: [  
      { path: "forgot", component: ForgetPasswordComponent },
      { path: "", component: SignInComponent }
    ]
  },
  {
    path: "admin", component: HotelportalComponent, canActivate: [AdminGuard], children: [
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AdminGuard] },
      { path: 'user/:id', component: ListuserComponent, canActivate: [AdminGuard] },
      { path: 'listuser', component: ListuserComponent, canActivate: [AdminGuard] },
      { path: 'payment/:id', component: ListpaymentComponent, canActivate: [AdminGuard] },
      { path: 'listpayment', component: ListpaymentComponent, canActivate: [AdminGuard] },
      { path: 'banner/:id', component: AddbannerComponent, canActivate: [AdminGuard] },
      { path: 'listbanner', component: ListbannerComponent, canActivate: [AdminGuard] },
      { path: 'enroll/:id', component: AddenrollmentComponent, canActivate: [AdminGuard] },
      { path: 'listenroll', component: ListenrollmentComponent, canActivate: [AdminGuard] },
      { path: 'category/:id', component: AddcoursecategoryComponent, canActivate: [AdminGuard] },
      { path: 'listcategory', component: ListcoursecategoryComponent, canActivate: [AdminGuard] },
      { path: 'subcategory/:id', component: AddcoursesubcategoryComponent, canActivate: [AdminGuard] },
      { path: 'listsubcategory', component: ListcoursesubcategoryComponent, canActivate: [AdminGuard] },
      { path: 'course/:id', component: AddcourseComponent, canActivate: [AdminGuard] },
      { path: 'listcourse', component: ListcourseComponent, canActivate: [AdminGuard] },
      { path: 'lesson/:id', component: AddLessonComponent, canActivate: [AdminGuard] },
      { path: 'listlesson', component: ListLessonComponent, canActivate: [AdminGuard] },
      { path: 'listenrollment', component: ListenrollmentComponent, canActivate: [AdminGuard] },
      { path: 'listquiz', component: ListQuizComponent, canActivate: [AdminGuard] },
      { path: 'addquiz/:id', component: AddQuizComponent, canActivate: [AdminGuard] },
      { path: 'editquiz/:id', component: AddQuizComponent, canActivate: [AdminGuard] },
      { path: 'listquizquestion/:quizid', component: ListQuizQuestionsComponent, canActivate: [AdminGuard] },      
      { path: 'addquizquestion/:quizid/:questionid/:questionno', component: AddQuizQuestionsComponent, canActivate: [AdminGuard] },
      { path: 'editquizquestion/:quizid/:questionid/:questionno', component: AddQuizQuestionsComponent, canActivate: [AdminGuard] },
      { path: 'resetpass', component: ResetPasswordComponent, canActivate: [AdminGuard] },  
      { path: 'quizscore/:quizid/:userid', component: QuizScoreComponent, canActivate: [AdminGuard] },  
      { path: 'liveclass/:id', component: AddLiveClassComponent, canActivate: [AdminGuard] },
      { path: 'listliveclass', component: ListLiveClassComponent, canActivate: [AdminGuard] },
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
