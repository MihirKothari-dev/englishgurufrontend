import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { CourseCategoryService } from 'src/app/services/course-category.service';

@Component({
  selector: 'app-listcoursecategory',
  templateUrl: './listcoursecategory.component.html',
  styleUrls: ['./listcoursecategory.component.scss']
})
export class ListcoursecategoryComponent implements OnInit {

  ccategoryData: any[] = [];

  selectedCustomerId: any = 0;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal: ElementRef;
  @ViewChild('btnDeleteCnfClose') btnDeleteCnfClose: ElementRef;
  constructor(private coursecategory: CourseCategoryService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCCategoryData();
  }

  getCCategoryData() {
    this.coursecategory.getAllCourseCategory().subscribe((result:any) => {
      if (result && result.data.length > 0) {      
        this.ccategoryData = result.data;
      } else {
        this.ccategoryData = [];
      }
    }, error => {
      this.notificationService.showError();
    })
  }

  edit(customer: any) {
    this.router.navigate(['/admin/category/'+customer.CategoryId]);
  }

  delete(customer: any) {
    this.selectedCustomerId = customer.CategoryId;
    this.deleteConfirmationModal.nativeElement.click();
  }
  openDialog(val: any) {
    if (val == 'delete') {
      this.coursecategory.deleteCourseCategory(this.selectedCustomerId).subscribe((result: any) => {
        this.notificationService.showSuccess("Record deleted successfully.","Info");
        this.selectedCustomerId = 0;
        this.getCCategoryData();        
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

}
