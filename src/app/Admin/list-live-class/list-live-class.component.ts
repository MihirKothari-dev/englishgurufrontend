import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { LessionService } from 'src/app/services/lession.service';
import { LiveclassService } from 'src/app/services/liveclass.service';
import * as moment from 'moment';

@Component({
  selector: 'app-list-live-class',
  templateUrl: './list-live-class.component.html',
  styleUrls: ['./list-live-class.component.scss']
})
export class ListLiveClassComponent implements OnInit {

  liveClassData: any[] = [];

  selectedCustomerId: any = 0;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal: ElementRef;
  @ViewChild('btnDeleteCnfClose') btnDeleteCnfClose: ElementRef;
  constructor(private liveclassService: LiveclassService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.getLiveClassData();
  }

  getLiveClassData() {    
    this.liveclassService.getAllLiveClass().subscribe((result:any) => {
      if (result && result.data.length > 0) {      
        this.liveClassData = result.data;
      } else {
        this.liveClassData = [];
      }
    }, error => {
      this.notificationService.showError();
    })
  }

  edit(customer: any) {
    this.router.navigate(['/admin/liveclass/'+customer.EnrollmentId]);
  }
  changeEnrollmentStatus(data: any) {
    let reqData = {
      "Date": data.Date,
      "EnrollmentId": data.EnrollmentId,
      "CourseId": data.CourseId,
      "UserId": data.UserId,
      "Status": data.Status
    }
    this.liveclassService.updateLiveClass(reqData).subscribe((result: any) => {
      this.notificationService.showSuccess("Record updated successfully.","Info");
      this.selectedCustomerId = 0;
      this.getLiveClassData();        
    }, error => {
      this.selectedCustomerId = 0;
      this.notificationService.showError();
    })
  }
  delete(customer: any) {
    this.selectedCustomerId = customer.LiveClassId;
    this.deleteConfirmationModal.nativeElement.click();
  }
  openDialog(val: any) {
    if (val == 'delete') {
      this.liveclassService.deleteLiveClass(this.selectedCustomerId).subscribe((result: any) => {
        this.notificationService.showSuccess("Record deleted successfully.","Info");
        this.selectedCustomerId = 0;
        this.getLiveClassData();        
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
  editLiveClass(val: any) {
    this.router.navigate(['/admin/liveclass/'+val.LiveClassId]);
  }
  convertTime(val: any) {
    let tm = val.split(":");
    let hh = 0;
    let z = "AM";
    if (+tm[0] > 12) {
      hh = +tm[0] - 12;
      z = "PM";
    } else {
      hh = +tm[0];
      z = "AM";
    }
    return hh +":"+ tm[1] + " "+z;
  }
}
