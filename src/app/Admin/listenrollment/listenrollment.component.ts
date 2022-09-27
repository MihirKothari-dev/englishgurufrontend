import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { LessionService } from 'src/app/services/lession.service';
import { EnrollmentService } from 'src/app/services/enrollment.service';

@Component({
  selector: 'app-listenrollment',
  templateUrl: './listenrollment.component.html',
  styleUrls: ['./listenrollment.component.scss']
})
export class ListenrollmentComponent implements OnInit {

  enrollmentData: any[] = [];

  selectedCustomerId: any = 0;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal: ElementRef;
  @ViewChild('btnDeleteCnfClose') btnDeleteCnfClose: ElementRef;
  constructor(private enrollmentService: EnrollmentService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.getEnrollmentData();
  }

  getEnrollmentData() {    
    this.enrollmentService.getAllEnrollment().subscribe((result:any) => {
      if (result && result.data.length > 0) {      
        this.enrollmentData = result.data;
      } else {
        this.enrollmentData = [];
      }
    }, error => {
      this.notificationService.showError();
    })
  }

  edit(customer: any) {
    this.router.navigate(['/admin/enroll/'+customer.EnrollmentId]);
  }
  changeEnrollmentStatus(data: any) {
    let reqData = {
      "Date": data.Date,
      "EnrollmentId": data.EnrollmentId,
      "CourseId": data.CourseId,
      "UserId": data.UserId,
      "Status": data.Status
    }
    this.enrollmentService.updateEnrollment(reqData).subscribe((result: any) => {
      this.notificationService.showSuccess("Record updated successfully.","Info");
      this.selectedCustomerId = 0;
      this.getEnrollmentData();        
    }, error => {
      this.selectedCustomerId = 0;
      this.notificationService.showError();
    })
  }
  delete(customer: any) {
    this.selectedCustomerId = customer.EnrollmentId;
    this.deleteConfirmationModal.nativeElement.click();
  }
  openDialog(val: any) {
    if (val == 'delete') {
      this.enrollmentService.deleteEnrollment(this.selectedCustomerId).subscribe((result: any) => {
        this.notificationService.showSuccess("Record deleted successfully.","Info");
        this.selectedCustomerId = 0;
        this.getEnrollmentData();        
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
  getQuizScore(val: any) {
    this.router.navigate(['/admin/quizscore/'+val.QuizId + '/'+val.UserId]);
  }
}
