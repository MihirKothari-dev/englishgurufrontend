import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private commonService: CommonService) {
  }
  canActivate() {
    let user: any = this.commonService.getUserSessionData();

    if (user) {
      if (user.GroupId == environment.AdminGroup.GroupId) {        
        return true;
      }
      else {
        this.navigateToLogin();
        return false;
      }
    }
    this.navigateToLogin();
    return false;
  }

  navigateToLogin() {
    this.router.navigate(["login"]);
  }  
}
