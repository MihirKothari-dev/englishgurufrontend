import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { DomSanitizer } from '@angular/platform-browser';
import { QuizService } from 'src/app/services/quiz.service';
import { QuizQuestionService } from 'src/app/services/quiz-question.service';

@Component({
  selector: 'app-list-quiz-questions',
  templateUrl: './list-quiz-questions.component.html',
  styleUrls: ['./list-quiz-questions.component.scss']
})
export class ListQuizQuestionsComponent implements OnInit {
  quizData: any[] = [];
  quizQuestionData: any[] = [];
  quizId: any = 0;
  selectedCustomerId: any = 0;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal: ElementRef;
  @ViewChild('btnDeleteCnfClose') btnDeleteCnfClose: ElementRef;
  constructor(private quizservice: QuizService,
    private notificationService: NotificationService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private activatedRoutes: ActivatedRoute,
    private quizQuestion: QuizQuestionService) { }

  ngOnInit(): void {
    this.quizId = this.activatedRoutes.snapshot.params["quizid"];
    if (this.quizId > 0) {
      this.getQuizDataById();
      this.getQuizQuestionData();
    }
    
  }

  getQuizQuestionData() {
    this.quizQuestion.getAllQuizQuestionByQuizId({"QuizId":+this.quizId}).subscribe((result:any) => {
      if (result && result.data.length > 0) {      
        this.quizQuestionData = result.data;
      } else {
        this.quizQuestionData = [];
      }
    }, error => {
      this.notificationService.showError();
    })
  }
  getQuizDataById() {    
    this.quizservice.getQuizById({"QuizId":+this.quizId}).subscribe((result:any) => {
      if (result && result.data.length > 0) {      
        this.quizData = result.data;
      } else {
        this.quizData = [];
      }
    }, error => {
      this.notificationService.showError();
    })
  }

  edit(customer: any, questionno: any) {
    this.router.navigate(['/admin/editquizquestion/'+this.quizId+'/'+customer.QuizQuestionId+'/'+questionno]);
  }

  delete(customer: any) {
    this.selectedCustomerId = customer.QuizId;
    this.deleteConfirmationModal.nativeElement.click();
  }
  openDialog(val: any) {
    if (val == 'delete') {
      this.quizservice.deleteQuiz(this.selectedCustomerId).subscribe((result: any) => {
        this.notificationService.showSuccess("Record deleted successfully.","Info");
        this.selectedCustomerId = 0;
        this.getQuizQuestionData();        
      }, error => {
        this.selectedCustomerId = 0;
        this.notificationService.showError();
      })
      this.btnDeleteCnfClose.nativeElement.click();
    }
    else if (val == 'cancel') {
      this.selectedCustomerId = 0;
      this.btnDeleteCnfClose.nativeElement.click();
    }
    
  }
  addquestion(quiz: any) {
    //Need to pass question number
    this.router.navigate(['/admin/addquizquestion/0']);
  }
  questionDetails(quiz: any) {
    this.router.navigate(['/admin/listquizquestion']);
  }
}
