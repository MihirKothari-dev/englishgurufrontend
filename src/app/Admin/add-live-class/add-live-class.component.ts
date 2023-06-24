import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseSubCategoryService } from 'src/app/services/course-sub-category.service';
import { CourseService } from 'src/app/services/course.service';
import { LiveclassService } from 'src/app/services/liveclass.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-live-class',
  templateUrl: './add-live-class.component.html',
  styleUrls: ['./add-live-class.component.scss']
})
export class AddLiveClassComponent implements OnInit {
  liveClassData:FormGroup;
  courseData:any[] = [];
  LiveClassId:any = 0;
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
    private liveClassService: LiveclassService,
    private spinner: NgxSpinnerService) { 
      this.LiveClassId = this.activatedRouter.snapshot.params["id"];
      this.getCourseData();
      if (this.LiveClassId > 0) {
        this.getLiveClassById();
      }
    }

  ngOnInit(): void {
    this.liveClassData = this.fb.group({
      ClassTitle: [""],
      CourseId: [""],
      StartDate: [""],
      StartTime: [""],
      EndDate: [""],
      EndTime: [""],
      Description: [""],
      LiveClassId: [0]
    });
  }

  getLiveClassById() {
    this.liveClassService.getLiveClassbyId({LiveClassId: +this.LiveClassId}).subscribe((result: any) => {
      if (result.data.length > 0) {
        this.liveClassData.patchValue(result.data[0]);
      }      
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
  
  saveCourse() {
    this.spinner.show();
    if (this.LiveClassId == 0) {
      this.liveClassService.createLiveClass(this.liveClassData.value).subscribe((result: any) => {
        this.spinner.hide();
        this.notificationService.showSuccess("Details added successfully","Info");
        this.redirectToListPage();
      }, error => {
        this.spinner.hide();
        this.notificationService.showError();
      })
    } else {
      this.liveClassService.updateLiveClass(this.liveClassData.value).subscribe((result: any) => {
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
    this.router.navigate(['/admin/listliveclass']);
  }
  getCourseData() {    
    this.courseservice.getAllCourse().subscribe((result:any) => {
      if (result && result.data.length > 0) {      
        this.courseData = result.data;
      } else {
        this.courseData = [];
      }
    }, error => {
      this.notificationService.showError();
    })
  }
}
