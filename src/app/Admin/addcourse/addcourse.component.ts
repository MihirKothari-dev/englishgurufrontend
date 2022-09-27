import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseSubCategoryService } from 'src/app/services/course-sub-category.service';
import { CourseService } from 'src/app/services/course.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export class AddcourseComponent implements OnInit {
  courseData:FormGroup;
  courseId:any = 0;
  courseCategoryData: any = [];
  courseSubCategoryData: any = [];
  selectedFile: File;
  @ViewChild('selectFile') selectFile: ElementRef;
  constructor(private notificationService: NotificationService,
    private activatedRouter: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private coursecategoryservice: CourseCategoryService,
    private coursesubcategoryservice: CourseSubCategoryService,
    private courseservice: CourseService,
    private spinner: NgxSpinnerService) { 
      this.courseId = this.activatedRouter.snapshot.params["id"];
      this.getAllCourseCategory();
      this.getAllCourseSubCategory();
      if (this.courseId > 0) {
        this.getcoursebyid();
      }
    }

  ngOnInit(): void {
    this.courseData = this.fb.group({
      CourseId: [""],
      SubCategoryId: [""],
      CategoryId: [""],
      CourseName: [""],
      CourseDuration: [""],
      WhatWeCover: [""],
      CoursePrice: [""],
      NoofLession: [""],
      AuthorName: [""],
      levelofCourse: [""],
      file: [""]
    });
  }

  getcoursebyid() {
    this.courseservice.getCourseById(this.courseId).subscribe((result: any) => {
      this.courseData.patchValue(result.data);
    });
  }

  getAllCourseCategory() {
    this.coursecategoryservice.getAllCourseCategory().subscribe((result: any) => {
      this.courseCategoryData = result.data;
    });
  }

  getAllCourseSubCategory() {
    this.coursesubcategoryservice.getAllSubCourseCategory().subscribe((result: any) => {
      this.courseSubCategoryData = result.data;
    });
  }

  openFileUploader(prid: any) {
    // this.imageUploadId = prid;
    // this.uploadType = uploadTo;
    this.selectFile.nativeElement.click();
  }
  onFileUpload(event: any) {
    this.selectedFile = event.target.files[0];    
    
  }
  uploadImage() {
    
  }
  saveCourse() {
    this.spinner.show();
    if (this.courseId == 0) {
      this.courseservice.createCourse(this.courseData.value).subscribe((result: any) => {
        this.spinner.hide();
        this.notificationService.showSuccess("Details added successfully","Info");
        this.redirectToListPage();
      }, error => {
        this.spinner.hide();
        this.notificationService.showError();
      })
    } else {
      this.courseservice.updateCourse(this.courseData.value).subscribe((result: any) => {
        this.spinner.hide();
        this.notificationService.showSuccess("Details updated successfully","Info");
        this.redirectToListPage();
      }, error => {
        this.spinner.hide();
        this.notificationService.showError();
      })
    }
  }
  redirectToListPage() {
    this.router.navigate(['/admin/listcourse']);
  }
}
