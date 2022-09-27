import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, concatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private _httpclient:HttpClient) { }
  getAllBanner() {
    return this._httpclient.get(environment.getAllBanner);
  }
  deleteBanner(reqDdata: any) {
    return this._httpclient.delete(environment.deleteBanner+reqDdata);
  }
  createBanner(reqData: any) {    
    return this._httpclient.post(environment.createBanner, reqData);
  }
  createBannerProcess(bannerData: any, filesData: any) {
    return this.createBanner(bannerData).pipe(
      concatMap((result: any) => this.addFile(filesData, result.data.BannerId))
    );
  }
  addFile(fileData: any, id: any) {
    const headers = new HttpHeaders();
    const formData: FormData = new FormData();
    formData.append('file', fileData);
    formData.append('BannerId', id);
    return this._httpclient.post(environment.commonAddFile, formData, { headers, responseType: 'text'});
  }
  updateBannerProcess(bannerData: any, filesData: any, bannerId: any) {
    return this.updateBanner(bannerData).pipe(
      concatMap((result: any) => this.addFile(filesData, bannerId))
    );
  }
  updateBanner(reqData: any) {    
    return this._httpclient.put(environment.updateBanner, reqData);
  }
  getBannerById(reqData: any) {
    return this._httpclient.get(environment.getBannerById+reqData);
  }
  deleteBannerFile(reqData: any) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this._httpclient.delete(environment.deleteBannerFile+reqData,  { headers, responseType: 'text'});
  }
}
