import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-listcourse',
  templateUrl: './listcourse.component.html',
  styleUrls: ['./listcourse.component.scss']
})
export class ListcourseComponent implements OnInit {
  courseData: any[] = [];
  selectedFile: File;
  selectedCustomerId: any = 0;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal: ElementRef;
  @ViewChild('btnDeleteCnfClose') btnDeleteCnfClose: ElementRef;
  @ViewChild('selectFile') selectFile: ElementRef;
  constructor(private coursedetails: CourseService,
    private notificationService: NotificationService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getCourseData();
  }

  getCourseData() {    
    this.coursedetails.getAllCourse().subscribe((result:any) => {
      if (result && result.data.length > 0) {      
        this.courseData = result.data;
      } else {
        this.courseData = [];
      }
    }, error => {
      this.notificationService.showError();
    })
  }

  edit(customer: any) {
    this.router.navigate(['/admin/course/'+customer.CourseId]);
  }

  delete(customer: any) {
    this.selectedCustomerId = customer.CourseId;
    this.deleteConfirmationModal.nativeElement.click();
  }
  openDialog(val: any) {
    if (val == 'delete') {
      this.coursedetails.deleteCourse(this.selectedCustomerId).subscribe((result: any) => {
        this.notificationService.showSuccess("Record deleted successfully.","Info");
        this.selectedCustomerId = 0;
        this.getCourseData();        
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
  photoURL(data: any) {
    let url = 'about:blank';
    if (data) {
      url = `${data}`;
    }    
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  openFileUploader(customer: any) {
    this.selectedCustomerId = customer.CourseId;
    this.selectFile.nativeElement.click();
  }
  onFileUpload(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.uploadImage();
    } else {
      this.notificationService.showError('Unsupported File Type!', 'Error!');
    }
  }
  uploadImage() {
    this.spinner.show();
    this.coursedetails.addFile(this.selectedFile, this.selectedCustomerId).subscribe((result: any) => {
      this.notificationService.showSuccess("File uploaded!", "Info");
      this.spinner.hide();
      this.selectedCustomerId = 0;
      this.getCourseData();        
    }, error => {
      this.spinner.hide();
      this.selectedCustomerId = 0;
      this.notificationService.showError();
    })
  }

  deleteFile(val: any) {
    this.coursedetails.deleteCourseFile(val.CourseImageId).subscribe((result: any) => {
      alert("Course file deleted");
      this.selectedCustomerId = 0;
      this.getCourseData();        
    }, error => {
      this.selectedCustomerId = 0;
      alert("Error");
    })
  }
}
