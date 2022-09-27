import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { LessionService } from 'src/app/services/lession.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-lesson',
  templateUrl: './list-lesson.component.html',
  styleUrls: ['./list-lesson.component.scss']
})
export class ListLessonComponent implements OnInit {
  lessonData: any[] = [];
  selectedFile: File;
  selectedCustomerId: any = 0;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal: ElementRef;
  @ViewChild('btnDeleteCnfClose') btnDeleteCnfClose: ElementRef;
  @ViewChild('selectFile') selectFile: ElementRef;
  constructor(private lessonDetails: LessionService,
    private notificationService: NotificationService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getLessonData();
  }

  getLessonData() {    
    this.lessonDetails.getAllLesson().subscribe((result:any) => {
      if (result && result.data.length > 0) {      
        this.lessonData = result.data;
      } else {
        this.lessonData = [];
      }
    }, error => {
      this.notificationService.showError();
    })
  }

  edit(customer: any) {
    this.router.navigate(['/admin/lesson/'+customer.lessionId]);
  }

  delete(customer: any) {
    this.selectedCustomerId = customer.lessionId;
    this.deleteConfirmationModal.nativeElement.click();
  }
  openDialog(val: any) {
    if (val == 'delete') {
      this.lessonDetails.deleteLesson(this.selectedCustomerId).subscribe((result: any) => {
        this.notificationService.showSuccess("Record deleted successfully.","Info");
        this.selectedCustomerId = 0;
        this.getLessonData();        
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
    this.selectedCustomerId = customer.lessionId;
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
    this.lessonDetails.addFile(this.selectedFile, this.selectedCustomerId).subscribe((result: any) => {
      this.notificationService.showSuccess("File uploaded!", "Info");
      this.spinner.hide();
      this.selectedCustomerId = 0;
      this.getLessonData();        
    }, error => {
      this.spinner.hide();
      this.selectedCustomerId = 0;
      this.notificationService.showError();
    })
  }

  deleteFile(val: any) {
    this.lessonDetails.deleteLessionFile(val.lessonImageId).subscribe((result: any) => {
      alert("Lession file deleted");
      this.selectedCustomerId = 0;
      this.getLessonData();        
    }, error => {
      this.selectedCustomerId = 0;
      alert("Error");
    })
  }

}
