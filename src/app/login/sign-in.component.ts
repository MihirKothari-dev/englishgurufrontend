import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CommonService } from '../services/common.service';
import { LoginService } from '../services/login.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private router: Router) { 
      this.loginForm = this.formBuilder.group({
        Email: ['', [Validators.required]],
        Password: ['', [Validators.required]]
      });
  }

  ngOnInit(): void {
  }
  forgotPass() {
    this.router.navigate(['/login/forgot']);
  }
  login() {
    if(this.loginForm.valid) {
      // let result = {
      //   data:[{
      //     Email: "test@gmail.com",
      //     GroupId: 2
      //   }]
      // }
      // this.commonService.setLoggedInUserData(result);
      // this.router.navigate(['admin/dashboard']);
      this.loginService.login(this.loginForm.value).subscribe(result => {
        if (result && result.success == false) {
          this.notificationService.showError("Username or password are wrong.", 'Login Error' );
        }
        else {
          let resultdata = {
            data:[{
              Email: result.data[0].Email,
              GroupId: 2
            }]
          }
          this.commonService.setLoggedInUserData(resultdata);
          // if (result.data[0].Group[0].GroupName == environment.AdminGroup.GroupName && 
          // result.data[0].GroupId == environment.AdminGroup.GroupId)
          // {
              this.router.navigate(['admin/dashboard']);
          // }
          // else {
          //   this.notificationService.showError("Something went wrong. please try again.",'Login Error');
          // }
        }
      },error => {
        this.notificationService.showError("Something went wrong. please try again.", 'Login Error');
      });
    }
    else {
      this.notificationService.showError("Something went wrong. please try again.", 'Login Error');
    }
    
  }

}
