import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseSubCategoryService } from 'src/app/services/course-sub-category.service';
import { CourseService } from 'src/app/services/course.service';
import { LessionService } from 'src/app/services/lession.service';
import { NotificationService } from 'src/app/services/notification.service';
import { QuizQuestionService } from 'src/app/services/quiz-question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz-questions',
  templateUrl: './add-quiz-questions.component.html',
  styleUrls: ['./add-quiz-questions.component.scss']
})
export class AddQuizQuestionsComponent implements OnInit {
  quizeData:FormGroup;
  quizId:any = 0;
  quizQuestionId: any = 0;
  quizQuestionNo: any = 0;
  courseCategoryData: any = [];
  courseSubCategoryData: any = [];
  courseData: any = [];
  constructor(private notificationService: NotificationService,
    private activatedRouter: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private coursecategoryservice: CourseCategoryService,
    private coursesubcategoryservice: CourseSubCategoryService,
    private courseservice: CourseService,
    private quizService: QuizService,
    private quizQuestionService: QuizQuestionService) { 
      this.quizId = this.activatedRouter.snapshot.params["quizid"];
      this.quizQuestionId = this.activatedRouter.snapshot.params["questionid"];
      this.quizQuestionNo = this.activatedRouter.snapshot.params["questionno"];
      if (this.quizId > 0) {
        this.getquizbyid();
      }
      if (this.quizQuestionId > 0) {
        this.getquizQuestionbyid();
      }
    }

  ngOnInit(): void {
    this.quizeData = this.fb.group({
      QuizId: [0],
      QuizQuestionId: [0],
      QuizQuestion: [""],
      Option1: [""],
      Option2: [""],
      Option3: [""],
      Option4: [""],
      CorrectAnswer: [""],
      QuizQuesionNo: [0],
      QuizTitle: [""]
    });
    this.quizeData.patchValue({QuizQuesionNo: this.quizQuestionNo});
  }
  getquizbyid() {
    this.quizService.getQuizById({"QuizId":+this.quizId}).subscribe((result: any) => {
      this.quizeData.patchValue({"QuizId": this.quizId, "QuizTitle": result.data[0].QuizTitle});
    });
  }
  getquizQuestionbyid() {
    this.quizQuestionService.getQuizQuestionById(this.quizQuestionId).subscribe((result: any) => {
      this.quizeData.patchValue(result.data);
    });
  }
 
  saveQuizQuestion() {
    if (this.quizQuestionId == 0) {
      this.quizQuestionService.createQuizQuestion(this.quizeData.value).subscribe((result: any) => {
        this.notificationService.showSuccess("Details added successfully","Info");
        this.redirectToListPage();
      }, error => {
        this.notificationService.showError();
      })
    } else {
      this.quizQuestionService.updateQuizQuestion(this.quizeData.value).subscribe((result: any) => {
        this.notificationService.showSuccess("Details updated successfully","Info");
        this.redirectToListPage();
      }, error => {
        this.notificationService.showError();
      })
    }
  }
  redirectToListPage() {
    this.router.navigate(['/admin/listquiz']);
  }

}
