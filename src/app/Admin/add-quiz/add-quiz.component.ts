import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseSubCategoryService } from 'src/app/services/course-sub-category.service';
import { CourseService } from 'src/app/services/course.service';
import { LessionService } from 'src/app/services/lession.service';
import { NotificationService } from 'src/app/services/notification.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {
  quizeData:FormGroup;
  quizId:any = 0;
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
    private quizService: QuizService) { 
      this.quizId = this.activatedRouter.snapshot.params["id"];
      this.getAllCourseCategory();
      this.getAllCourseSubCategory();
      this.getAllCourseData();
      if (this.quizId > 0) {
        this.getquizbyid();
      }
    }

  ngOnInit(): void {
    this.quizeData = this.fb.group({
      QuizId: [""],
      CourseId: [""],
      CategoryId: [""],
      SubCategoryId: [""],
      QuizTimeDuration: [""],
      NoofQuizQuestion: [""],
      QuizMarkingSchema: [""],
      QuizTitle: [""],
      QuizQuestionNo: [""]
    });
  }

  getquizbyid() {
    this.quizService.getQuizById({"QuizId":+this.quizId}).subscribe((result: any) => {
      this.quizeData.patchValue(result.data[0]);
    });
  }

  getAllCourseData() {
    this.courseservice.getAllCourse().subscribe((result: any) => {
      this.courseData = result.data;
    });
  }

  getAllCourseCategory() {
    this.coursecategoryservice.getAllCourseCategory().subscribe((result: any) => {
      this.courseCategoryData = result.data;
    });
  }

  getAllCourseSubCategory() {
    this.coursesubcategoryservice.getAllSubCourseCategory().subscribe((result: any) => {
      this.courseSubCategoryData = result.data;
    });
  }

 
  saveQuiz() {
    if (this.quizId == 0) {
      this.quizService.createQuiz(this.quizeData.value).subscribe((result: any) => {
        this.notificationService.showSuccess("Details added successfully","Info");
        this.redirectToListPage();
      }, error => {
        this.notificationService.showError();
      })
    } else {
      this.quizService.updateQuiz(this.quizeData.value).subscribe((result: any) => {
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
