import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private _httpclient:HttpClient) { }
  getAllEnrollment() {
    return this._httpclient.get(environment.getAllEnrollment);
  }
  deleteEnrollment(reqDdata: any) {
    return this._httpclient.delete(environment.deleteEnrollment+reqDdata);
  }
  createCourse(reqData: any, file: File) {
    
  }
  updateEnrollment(reqData: any) {
    return this._httpclient.put(environment.updateEnrollment, reqData);
  }
  getCourseById(reqData: any) {
    
  }
}
