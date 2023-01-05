import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, concatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private _httpclient:HttpClient) { }
  getAllCourse() {
    return this._httpclient.get(environment.getAllCourseDetails);
  }
  deleteCourse(reqDdata: any) {
    return this._httpclient.delete(environment.deleteCourseDetails+reqDdata);
  }
  createCourse(reqData: any) {
    // const formData: FormData = new FormData();
    // formData.append('file', file);
    // formData.append('CourseId', reqData.CourseId);
    // formData.append('SubCategoryId', reqData.SubCategoryId);
    // formData.append('CategoryId', reqData.CategoryId);
    // formData.append('CourseName', reqData.CourseName);
    // formData.append('CourseDuration', reqData.CourseDuration);
    // formData.append('WhatWeCover', reqData.WhatWeCover);
    // formData.append('CoursePrice', reqData.CoursePrice);
    // formData.append('NoofLession', reqData.NoofLession);
    // formData.append('AuthorName', reqData.AuthorName);
    // formData.append('levelofCourse', reqData.levelofCourse);
    return this._httpclient.post(environment.createCourseDetails, reqData);
  }
  createCourseProcess(courseData: any, filesData: any) {
    return this.createCourse(courseData).pipe(
      concatMap((result: any) => this.addFile(filesData, result.data.CourseId))
    );
  }
  addFile(fileData: any, id: any) {
    const headers = new HttpHeaders();
    const formData: FormData = new FormData();
    formData.append('file', fileData);
    formData.append('CourseId', id);
    return this._httpclient.post(environment.courseAddFile, formData, { headers, responseType: 'text'});
  }
  updateCourserProcess(courseData: any, filesData: any, courseId: any) {
    return this.updateCourse(courseData).pipe(
      concatMap((result: any) => this.addFile(filesData, courseId))
    );
  }
  updateCourse(reqData: any) {
    // const formData: FormData = new FormData();
    // formData.append('file', file);
    // formData.append('CourseId', reqData.CourseId);
    // formData.append('SubCategoryId', reqData.SubCategoryId);
    // formData.append('CategoryId', reqData.CategoryId);
    // formData.append('CourseName', reqData.CourseName);
    // formData.append('CourseDuration', reqData.CourseDuration);
    // formData.append('WhatWeCover', reqData.WhatWeCover);
    // formData.append('CoursePrice', reqData.CoursePrice);
    // formData.append('NoofLession', reqData.NoofLession);
    // formData.append('AuthorName', reqData.AuthorName);
    // formData.append('levelofCourse', reqData.levelofCourse);
    return this._httpclient.put(environment.updateCourseDetails, reqData);
  }
  getCourseById(reqData: any) {
    return this._httpclient.post(environment.getCourseDetailById, reqData);
  }
  deleteCourseFile(reqData: any) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this._httpclient.delete(environment.deleteCourseFile+reqData ,  { headers, responseType: 'text'});
  }
}
