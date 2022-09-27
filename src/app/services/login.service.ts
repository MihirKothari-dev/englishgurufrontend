import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _httpclient:HttpClient) {

  }
  login(data:any) {
    return this._httpclient.post<any>(environment.userlogin, data);
  }
}
