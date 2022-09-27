import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { QuizService } from 'src/app/services/quiz.service';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-quiz-score',
  templateUrl: './quiz-score.component.html',
  styleUrls: ['./quiz-score.component.scss']
})
export class QuizScoreComponent implements OnInit {
  quizData: any[] = [];
  quizId: any = 0;
  userId: any = 0; 
  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Correct Answer' ], [ 'Wrong Answer' ] ];
  public pieChartDatasets = [ {
    data: [ 0, 0 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins:any = [];
  constructor(private quizservice: QuizService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoutes: ActivatedRoute) { }

    ngOnInit(): void {
      this.quizId = this.activatedRoutes.snapshot.params["quizid"];
      this.userId = this.activatedRoutes.snapshot.params["userid"];
      if (this.quizId > 0 && this.userId != 0) {
        this.getQuizScoreDataById();        
      } else {
        this.notificationService.showInfo("Quiz result not found for this user.","Info");
      }
      
    }

    getQuizScoreDataById() {    
      this.quizservice.getQuizScoreByUser({"QuizId":+this.quizId, "UserId":this.userId}).subscribe((result:any) => {
        if (result && result.data.length > 0) {      
          this.quizData = result.data;
          if (this.quizData && this.quizData.length > 0) {
            this.pieChartDatasets = [
              {
                data: [this.quizData[0]?.TotalCorrectAnswer, this.quizData[0]?.TotalWorngAnswer]
              }
            ]
          } else {
            this.notificationService.showInfo("Quiz result not found for this user.","Info");
          }
        } else {
          this.quizData = [];
          this.notificationService.showInfo("Quiz result not found for this user.","Info");
        }
      }, error => {
        this.notificationService.showError();
      })
    }
}
