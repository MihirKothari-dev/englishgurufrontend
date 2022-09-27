import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseSubCategoryService } from 'src/app/services/course-sub-category.service';
import { CourseService } from 'src/app/services/course.service';
import { LessionService } from 'src/app/services/lession.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss']
})
export class AddLessonComponent implements OnInit {

  lessonData:FormGroup;
  lessonId:any = 0;
  courseCategoryData: any = [];
  courseSubCategoryData: any = [];
  courseData: any = [];
  selectedFile: File;
  @ViewChild('selectFile') selectFile: ElementRef;
  constructor(private notificationService: NotificationService,
    private activatedRouter: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private coursecategoryservice: CourseCategoryService,
    private coursesubcategoryservice: CourseSubCategoryService,
    private courseservice: CourseService,
    private lessonService: LessionService,
    private spinner: NgxSpinnerService) { 
      this.lessonId = this.activatedRouter.snapshot.params["id"];
      this.getAllCourseCategory();
      this.getAllCourseSubCategory();
      this.getAllCourseData();
      if (this.lessonId > 0) {
        this.getlessonbyid();
      }
    }

  ngOnInit(): void {
    this.lessonData = this.fb.group({
      lessionId: [""],
      CourseId: [""],
      CategoryId: [""],
      SubCategoryId: [""],
      lessionNo: [""],
      lessionName: [""],
      "file": ""
    });
  }

  getlessonbyid() {
    this.lessonService.getLessonById(this.lessonId).subscribe((result: any) => {
      this.lessonData.patchValue(result.data);
    });
  }

  getAllCourseData() {
    this.courseservice.getAllCourse().subscribe((result: any) => {
      this.courseData = result.data;
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
    // if (this.selectedFile && (this.selectedFile.type === 'image/png' || this.selectedFile.type === 'image/jpeg')) {
    // this.uploadImage();
    // } else {
    //   this.notificationService.showError('Unsupported File Type. Only jpeg and png is allowed!', 'Error!');
    // }
  }
  uploadImage() {
    
  }
  saveLesson() {
    this.spinner.show();
    if (this.lessonId == 0) {
      this.lessonService.createLesson(this.lessonData.value).subscribe((result: any) => {
        this.spinner.hide();
        this.notificationService.showSuccess("Details added successfully","Info");
        this.redirectToListPage();        
      }, error => {
        this.spinner.hide();
        this.notificationService.showError();
      })
    } else {
      this.lessonService.updateLesson(this.lessonData.value).subscribe((result: any) => {
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
    this.router.navigate(['/admin/listlesson']);
  }

}
