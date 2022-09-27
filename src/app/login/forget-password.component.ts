import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
//import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPassForm! : FormGroup;
  isPasswordSent = false;

  constructor(
    private formBuilder: FormBuilder, 
    private notificationService:NotificationService,
    private router: Router,
   // private userService: UserService
  ) { }

  ngOnInit(): void {
    this.forgetPassForm = this.formBuilder.group({
      user_email: ['', Validators.compose([Validators.required])]
  })
  }

  getPassword(){
    if (!this.forgetPassForm.valid) {
      this.notificationService.showError('Email is required.', 'Error message')
      return;
    }
    // this.userService.getPassword(this.forgetPassForm.value).subscribe(result => {
    //   this.isPasswordSent = true;
    //   this.forgetPassForm.patchValue({user_email: ''});
    //   this.notificationService.showSuccess("Recovery email has been sent to your resgistered account.", "Success");
    // }, error => {
    //   if (error.status == 200) {
    //     this.notificationService.showError(error.error.text, "Error");
    //   }
    //   else {
    //     this.notificationService.showError();
    //   }
    // });
  }



}
