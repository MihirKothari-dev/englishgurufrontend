import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpclient:HttpClient) { }
  
  getAllUser() {
    return this._httpclient.get(environment.getAllUser);
  }
  deleteUser(reqDdata: any) {
    return this._httpclient.delete(environment.deleteUser+reqDdata);
  }
  resetPassword(data: any) {
    return this._httpclient.post<any>(environment.resetPassword, data);

  }
}
