import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {

  customerData: any[] = [];

  @ViewChild('deleteConfirmationModal') deleteConfirmationModal: ElementRef;
  @ViewChild('btnDeleteCnfClose') btnDeleteCnfClose: ElementRef;

  selectedCustomerId: any = 0;

  constructor(private user: UserService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCustomerData();
  }

  getCustomerData() {
    this.user.getAllUser().subscribe((result:any) => {
      if (result && result.data && result.data.length > 0) {      
        this.customerData = result.data;
      } else {
        this.customerData = [];
      }
    }, error => {
      this.notificationService.showError();
    })
  }

  edit(customer: any) {
    this.router.navigate(['/admin/customer/'+customer.CustomerId]);
  }

  delete(customer: any) {
    this.selectedCustomerId = customer._id;
    this.deleteConfirmationModal.nativeElement.click();
  }
  openDialog(val: any) {
    if (val == 'delete') {
      this.user.deleteUser(this.selectedCustomerId).subscribe((result: any) => {
        alert("Customer deleted");
        this.selectedCustomerId = 0;
        this.getCustomerData();        
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

}
