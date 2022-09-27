import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseSubCategoryService } from 'src/app/services/course-sub-category.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-addcoursesubcategory',
  templateUrl: './addcoursesubcategory.component.html',
  styleUrls: ['./addcoursesubcategory.component.scss']
})
export class AddcoursesubcategoryComponent implements OnInit {
  courseSubCategoryData:FormGroup;
  coursesubcategoryid:any = 0;
  constructor(private notificationService: NotificationService,
    private activatedRouter: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private coursecategoryservice: CourseSubCategoryService) { 
      this.coursesubcategoryid = this.activatedRouter.snapshot.params["id"];
      if (this.coursesubcategoryid > 0) {
        this.getcoursesubcategorybyid();
      }
    }

  ngOnInit(): void {
    this.courseSubCategoryData = this.fb.group({
      SubCategoryId: [0],
      CategoryId: [""],
      SubCategoryName: [""],
      SubCategoryStatus: [""]
    });
  }

  getcoursesubcategorybyid() {
    this.coursecategoryservice.getCourseSubCategoryById(this.coursesubcategoryid).subscribe((result: any) => {
      this.courseSubCategoryData.patchValue(result.data);
    });
  }

  saveSubCategory() {
    if (this.coursesubcategoryid == 0) {
      this.coursecategoryservice.createCourseSubCategory(this.courseSubCategoryData.value).subscribe((result: any) => {
        this.notificationService.showSuccess("Details added successfully","Info");
        this.redirectToListPage();
      }, error => {
        this.notificationService.showError();
      })
    } else {
      this.coursecategoryservice.updateCourseSubCategory(this.courseSubCategoryData.value).subscribe((result: any) => {
        this.notificationService.showSuccess("Details updated successfully","Info");
        this.redirectToListPage();
      }, error => {
        this.notificationService.showError();
      })
    }
  }
  redirectToListPage() {
    this.router.navigate(['/admin/listsubcategory']);
  }

}
