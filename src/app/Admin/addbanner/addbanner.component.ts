import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-addbanner',
  templateUrl: './addbanner.component.html',
  styleUrls: ['./addbanner.component.scss']
})
export class AddbannerComponent implements OnInit {
  selectedFile: File;
  bannerId:any = 0;
  bannerData:FormGroup;
  @ViewChild('selectFile') selectFile: ElementRef;
  constructor(private notificationService: NotificationService,
    private bannerService: BannerService,
    private activatedRouter: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { 
      this.bannerId = this.activatedRouter.snapshot.params["id"];
      if (this.bannerId > 0) {
        this.getBannerById();
      }
    }

  ngOnInit(): void {
    this.bannerData = this.fb.group({
      BannerId: [0],
      BannerTitle: [""],
      file: [""]
    });
  }

  getBannerById() {
    this.bannerService.getBannerById(this.bannerId).subscribe((result: any) => {
      this.bannerData.patchValue(result.data);
    });
  }
  openFileUploader(prid: any) {
    // this.imageUploadId = prid;
    // this.uploadType = uploadTo;
    this.selectFile.nativeElement.click();
  }
  onFileUpload(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile && (this.selectedFile.type === 'image/png' || this.selectedFile.type === 'image/jpeg')) {
      //this.uploadImage();
    } else {
      this.notificationService.showError('Unsupported File Type. Only jpeg and png is allowed!', 'Error!');
    }
  }
  uploadImage() {
    
  }
  saveBanner() {
    if (this.bannerId == 0) {
      this.bannerService.createBanner(this.bannerData.value).subscribe((result: any) => {
        this.notificationService.showSuccess("Details added successfully","Info");
        this.redirectToListPage();
      }, error => {
        this.notificationService.showError();
      })
    } else {
      this.bannerService.updateBanner(this.bannerData.value).subscribe((result: any) => {
        this.notificationService.showSuccess("Details updated successfully","Info");
        this.redirectToListPage();
      }, error => {
        this.notificationService.showError();
      })
    }
    
  }

  redirectToListPage() {
    this.router.navigate(['/admin/listbanner']);
  }
}
