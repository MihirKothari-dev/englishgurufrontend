import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {  
  private userData:any;   
  public updateHeader = new Subject<any>();
  sessionKey = "userdata";
  constructor(private httpclient: HttpClient) {
  }

  setLoggedInUserData(data:any) {
    this.userData = data;
    let sessionData =  {
      Email: this.userData.data[0].Email,
      GroupId: this.userData.data[0].GroupId
    }
    sessionStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
  }

  getLoggedInUserData() {
    return this.userData;
  }

  getUserSessionData() {
    if (sessionStorage.getItem(this.sessionKey)) {
      return JSON.parse(sessionStorage['userdata']);
    } else {
      return "";
    }
  }

  clearSession() {
    sessionStorage.removeItem(this.sessionKey);
  }

  clearLocallySavedData() {    
    this.userData = undefined;    
  }

  getAllStates() {
    return this.httpclient.get(environment.states);
  }
  getOnlyStates() {
    return this.httpclient.get(environment.allStates);
  }
  getAllDocketStatus() {
    return this.httpclient.get(environment.getAllDocketStatus);
  }
  getAllCities() {
    return this.httpclient.get(environment.allCities);
  }
  async getCitiesByState(reqData: any): Promise<any> {
    return this.httpclient.post<any>(environment.cityByStates, reqData).toPromise();
  }
  getAllContents() {
    return this.httpclient.get(environment.getAllContents);
  }
  getAllHSNCodeDetails() {
    return this.httpclient.get(environment.getHSNCodes);
  }
  updateProfile(reqData: any) {
    return this.httpclient.post(environment.updateProfile, reqData);
  }
  getAdminByEmail(reqData: any) {
    return this.httpclient.post(environment.getAdminByEmail, reqData);
  }
}
