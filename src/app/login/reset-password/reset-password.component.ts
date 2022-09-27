import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  loginForm: FormGroup;
  sessionData: any;
  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router) { 
      this.sessionData = this.commonService.getUserSessionData();
      this.loginForm = this.formBuilder.group({
        newpassword: ['', [Validators.required]],
        confirmpassword: ['', [Validators.required]],
        userId: [0]
      });
  }

  ngOnInit(): void {
  }

  resetPassword() {
    this.loginForm. patchValue({userId: this.sessionData.userId});
    if (!this.loginForm.valid || !(this.loginForm.value.newpassword === this.loginForm.value.confirmpassword)) {
      if (!this.loginForm.valid) {
        this.notificationService.showError('Enter all field data.', 'Error');
      } else {
        this.notificationService.showError("Password and confirm password not matched.","Error");
      }
      return;
    }
    let reqData = {
      "Email": this.sessionData.Email,
      "Password": this.loginForm.value.newpassword
    }
    this.userService.resetPassword(reqData).subscribe(result => {
      this.notificationService.showSuccess('Password reset successfully. Please logout and login again with new password.', 'Info');
      this.loginForm.patchValue({
        newpassword: '',
        confirmpassword: ''
      });
    }, error => {
      this.notificationService.showError();
    });
  }
}
