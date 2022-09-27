import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { CourseSubCategoryService } from 'src/app/services/course-sub-category.service';

@Component({
  selector: 'app-listcoursesubcategory',
  templateUrl: './listcoursesubcategory.component.html',
  styleUrls: ['./listcoursesubcategory.component.scss']
})
export class ListcoursesubcategoryComponent implements OnInit {

  ccategoryData: any[] = [];

  selectedCustomerId: any = 0;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal: ElementRef;
  @ViewChild('btnDeleteCnfClose') btnDeleteCnfClose: ElementRef;
  constructor(private courseSubCategory: CourseSubCategoryService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCCategoryData();
  }

  getCCategoryData() {
    this.courseSubCategory.getAllSubCourseCategory().subscribe((result:any) => {
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
    this.router.navigate(['/admin/subcategory/'+customer.SubCategoryId]);
  }

  delete(customer: any) {
    this.selectedCustomerId = customer.SubCategoryId;
    this.deleteConfirmationModal.nativeElement.click();
  }
  openDialog(val: any) {
    if (val == 'delete') {
      this.courseSubCategory.deleteCourseSubCategory(this.selectedCustomerId).subscribe((result: any) => {
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
