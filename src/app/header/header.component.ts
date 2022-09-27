import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { NotificationService } from '../services/notification.service';
//import { imageViewBaseUrl } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  hotelData: any;
  sessionData: any;
  profileForm: FormGroup;
  loginUserData: any;
  //imageviewpath = imageViewBaseUrl;
  @ViewChild('updateProfileModeModal') updateModeModal: ElementRef;
  @ViewChild('btnProfileDeleteCnfClose') btnDeleteCnfClose: ElementRef;
  constructor(private commonService: CommonService, 
    private router:Router, private formBuilder: FormBuilder,
    private notificationService: NotificationService) {
    this.sessionData = this.commonService.getUserSessionData();    
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({        
      adminId: [""],
      GroupId: [""],
      Name: [""],
      Email: [""],
      Password: [""]
    });
    this.loginUserData = this.commonService.getLoggedInUserData();
  }
  updateProfile() {
    this.updateModeModal.nativeElement.click();
    //this.loginUserData = this.commonService.getLoggedInUserData();
    this.commonService.getAdminByEmail({"Email": this.sessionData.Email}).subscribe((result:any) => {
      this.profileForm.patchValue(result.data[0]);
    })
  }

  logout() {
    this.commonService.clearSession();
    this.commonService.clearLocallySavedData();
    this.router.navigate(['\login']);
  }
  openDialog(val: any) {
    if (val == 'save') {
      this.commonService.updateProfile(this.profileForm.value).subscribe((result: any) => {        
        this.notificationService.showSuccess("Profile details updated", "Info");
        let data = result.data;
        let result1 = {
          data: [
            data
          ]
        }
        this.commonService.setLoggedInUserData(result1); 
        this.btnDeleteCnfClose.nativeElement.click();            
      }, error => {
        this.notificationService.showError();
        this.btnDeleteCnfClose.nativeElement.click();
      })
      
    }
    else if (val == 'cancel') {
      //this.selectedCustomerId = 0;
      this.btnDeleteCnfClose.nativeElement.click();
    }
    
  }
}
