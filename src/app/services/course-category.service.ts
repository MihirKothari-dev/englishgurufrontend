import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseCategoryService {

  constructor(private _httpclient:HttpClient) { }
  getAllCourseCategory() {
    return this._httpclient.get(environment.getAllCourseCategory);
  }
  deleteCourseCategory(reqDdata: any) {
    return this._httpclient.delete(environment.deleteCourseCategory+reqDdata);
  }
  createCourseCategory(reqData: any) {
    return this._httpclient.post(environment.createCourseCategory, reqData);
  }
  updateCourseCategory(reqData: any) {
    return this._httpclient.put(environment.updateCourseCategory, reqData);
  }
  getCourseCategoryById(reqData: any) {
    return this._httpclient.get(environment.getCourseCategoryById+reqData);
  }
}
