import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseSubCategoryService {

  constructor(private _httpclient:HttpClient) { }
  getAllSubCourseCategory() {
    return this._httpclient.get(environment.getAllCourseSubCategory);
  }
  deleteCourseSubCategory(reqDdata: any) {
    return this._httpclient.delete(environment.deleteCourseSubCategory+reqDdata);
  }
  createCourseSubCategory(reqData: any) {
    return this._httpclient.post(environment.createCourseSubCategory, reqData);
  }
  updateCourseSubCategory(reqData: any) {
    return this._httpclient.put(environment.updateCourseSubCategory, reqData);
  }
  getCourseSubCategoryById(reqData: any) {
    return this._httpclient.get(environment.getCourseSubCategoryById+reqData);
  }
}
