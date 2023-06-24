import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LiveclassService {
  constructor(private _httpclient:HttpClient) { }
  getAllLiveClass() {
    return this._httpclient.get(environment.getAllLiveClass);
  }
  deleteLiveClass(reqDdata: any) {
    return this._httpclient.delete(environment.deleteLiveClass+reqDdata);
  }
  createLiveClass(reqData: any) {
    return this._httpclient.post(environment.createLiveClass, reqData);
  }
  updateLiveClass(reqData: any) {
    return this._httpclient.post(environment.updateLiveClass, reqData);
  }
  getLiveClassbyId(reqData: any) {
    return this._httpclient.post(environment.getLiveClassById, reqData);
  }
}
