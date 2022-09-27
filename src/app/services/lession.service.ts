import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessionService {

  constructor(private _httpclient:HttpClient) { }
  getAllLesson() {
    return this._httpclient.get(environment.getAllLessonDetails);
  }
  deleteLesson(reqDdata: any) {
    return this._httpclient.delete(environment.deleteLessonDetails+reqDdata);
  }
  createLesson(reqData: any) {    
    return this._httpclient.post(environment.createLessonDetails, reqData);
  }
  updateLesson(reqData: any) {    
    return this._httpclient.put(environment.updateLessonDetails, reqData);
  }
  getLessonById(reqData: any) {
    return this._httpclient.get(environment.getLessonDetailsById+reqData);
  }
  addFile(fileData: any, id: any) {
    const headers = new HttpHeaders();
    const formData: FormData = new FormData();
    formData.append('file', fileData);
    formData.append('lessionId', id);
    return this._httpclient.post(environment.lessionAddFile, formData, { headers, responseType: 'text'});
  }
  deleteLessionFile(reqData: any) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this._httpclient.delete(environment.deleteLessionFile+reqData ,  { headers, responseType: 'text'});
  }
}
