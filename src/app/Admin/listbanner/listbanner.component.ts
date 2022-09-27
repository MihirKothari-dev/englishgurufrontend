import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-listbanner',
  templateUrl: './listbanner.component.html',
  styleUrls: ['./listbanner.component.scss']
})
export class ListbannerComponent implements OnInit {

  bannerData: any[] = [];
  selectedFile: File;
  selectedCustomerId: any = 0;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal: ElementRef;
  @ViewChild('btnDeleteCnfClose') btnDeleteCnfClose: ElementRef;
  @ViewChild('selectFile') selectFile: ElementRef;
  constructor(private banner: BannerService,
    private notificationService: NotificationService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getBannerData();
  }

  getBannerData() {
    this.banner.getAllBanner().subscribe((result:any) => {
      if (result && result.data.length > 0) {      
        this.bannerData = result.data;
      } else {
        this.bannerData = [];
      }
    }, error => {
      this.notificationService.showError();
    })
  }

  edit(customer: any) {
    this.router.navigate(['/admin/banner/'+customer.BannerId]);
  }

  delete(customer: any) {
    this.selectedCustomerId = customer.BannerId;
    this.deleteConfirmationModal.nativeElement.click();
  }

  openFileUploader(customer: any) {
    this.selectedCustomerId = customer.BannerId;
    this.selectFile.nativeElement.click();
  }
  onFileUpload(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.uploadImage();
    } else {
      this.notificationService.showError('Unsupported File Type!', 'Error!');
    }
  }
  uploadImage() {
    this.spinner.show();
    this.banner.addFile(this.selectedFile, this.selectedCustomerId).subscribe((result: any) => {
      this.notificationService.showSuccess("File uploaded!", "Info");
      this.spinner.hide();
      this.selectedCustomerId = 0;
      this.getBannerData();        
    }, error => {
      this.spinner.hide();
      this.selectedCustomerId = 0;
      this.notificationService.showError();
    })
  }

  openDialog(val: any) {
    if (val == 'delete') {
      this.banner.deleteBanner(this.selectedCustomerId).subscribe((result: any) => {
        alert("Banner deleted");
        this.selectedCustomerId = 0;
        this.getBannerData();        
      }, error => {
        this.selectedCustomerId = 0;
        alert("Error");
      })
      this.btnDeleteCnfClose.nativeElement.click();
    }
    else if (val == 'cancel') {
      this.selectedCustomerId = 0;
      this.btnDeleteCnfClose.nativeElement.click();
    }
    
  }

  photoURL(data: any) {
    let url = 'about:blank';
    if (data) {
      url = `${data}`;
    }    
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  deleteFile(val: any) {
    this.banner.deleteBannerFile(val.BannerImageId).subscribe((result: any) => {
      alert("Banner file deleted");
      this.selectedCustomerId = 0;
      this.getBannerData();        
    }, error => {
      this.selectedCustomerId = 0;
      alert("Error");
    })
  }
}
