import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { DomSanitizer } from '@angular/platform-browser';
import { QuizService } from 'src/app/services/quiz.service';


@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.scss']
})
export class ListQuizComponent implements OnInit {
  quizData: any[] = [];

  selectedCustomerId: any = 0;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal: ElementRef;
  @ViewChild('btnDeleteCnfClose') btnDeleteCnfClose: ElementRef;
  constructor(private quizservice: QuizService,
    private notificationService: NotificationService,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getQuizData();
  }

  getQuizData() {    
    this.quizservice.getAllQuiz().subscribe((result:any) => {
      if (result && result.data.length > 0) {      
        this.quizData = result.data;
      } else {
        this.quizData = [];
      }
    }, error => {
      this.notificationService.showError();
    })
  }

  edit(customer: any) {
    this.router.navigate(['/admin/editquiz/'+customer.QuizId]);
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
        this.getQuizData();        
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
    this.router.navigate(['/admin/addquizquestion/'+quiz.QuizId+'/'+0+'/'+(quiz.QuizQuestion.length + 1)]);
  }
  questionDetails(quiz: any) {
    this.router.navigate(['/admin/listquizquestion/'+quiz.QuizId]);
  }
}
