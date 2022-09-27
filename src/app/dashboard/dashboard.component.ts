import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { EnrollmentService } from '../services/enrollment.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalUSerRegister: any = 0;
  totalUserEnrolled: any = 0;
  totalCourseAdded: any = 0;
  constructor(private userServcie: UserService, private courseService: CourseService,
    private enrolledService: EnrollmentService) { }
  getAllUser() {
    this.userServcie.getAllUser().subscribe((result:any) => {
      this.totalUSerRegister = result.data.length;
    })
  }
  getAllCourse() {
    this.courseService.getAllCourse().subscribe((result:any) => {
      this.totalCourseAdded = result.data.length;
    })
  }
  getAllUserEnrolled() {
    this.enrolledService.getAllEnrollment().subscribe((result:any) => {
      this.totalUserEnrolled = result.data.length;
    })
  }
  ngOnInit(): void {
   this.getAllUser();
   this.getAllCourse();
   this.getAllUserEnrolled();
  }

}
