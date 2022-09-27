import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-addcoursecategory',
  templateUrl: './addcoursecategory.component.html',
  styleUrls: ['./addcoursecategory.component.scss']
})
export class AddcoursecategoryComponent implements OnInit {
  courseCategoryData:FormGroup;
  coursecategoryid:any = 0;
  constructor(private notificationService: NotificationService,
    private activatedRouter: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private coursecategoryservice: CourseCategoryService) { 
      this.coursecategoryid = this.activatedRouter.snapshot.params["id"];
      if (this.coursecategoryid > 0) {
        this.getcoursecategorybyid();
      }
    }

  ngOnInit(): void {
    this.courseCategoryData = this.fb.group({
      CategoryId: [0],
      CategoryName: [""],
      CategoryStatus: [""]
    });
  }

  getcoursecategorybyid() {
    this.coursecategoryservice.getCourseCategoryById(this.coursecategoryid).subscribe((result: any) => {
      this.courseCategoryData.patchValue(result.data);
    });
  }

  saveCategory() {
    if (this.coursecategoryid == 0) {
      this.coursecategoryservice.createCourseCategory(this.courseCategoryData.value).subscribe((result: any) => {
        this.notificationService.showSuccess("Details added successfully","Info");
        this.redirectToListPage();
      }, error => {
        this.notificationService.showError();
      })
    } else {
      this.coursecategoryservice.updateCourseCategory(this.courseCategoryData.value).subscribe((result: any) => {
        this.notificationService.showSuccess("Details updated successfully","Info");
        this.redirectToListPage();
      }, error => {
        this.notificationService.showError();
      })
    }
  }
  redirectToListPage() {
    this.router.navigate(['/admin/listcategory']);
  }
}
