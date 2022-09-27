import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listpayment',
  templateUrl: './listpayment.component.html',
  styleUrls: ['./listpayment.component.scss']
})
export class ListpaymentComponent implements OnInit {

  paymentData: any[] = [];

  selectedCustomerId: any = 0;
  constructor(
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPaymentData();
  }

  getPaymentData() {
    this.paymentData = [
      {
        date: new Date(),
        orderid: 12345,
        coursename: "test",
        CustomerId: 1245,
        custname: "testttt",
        totalamt: 12354,
        amtreceived: 15465,
        txtid: 154456,
        
      }
    ];
    // this.payment.getAllPayment().subscribe((result:any) => {
    //   if (result && result.data.length > 0) {      
    //     this.paymentData = result.data;
    //   } else {
    //     this.paymentData = [];
    //   }
    // }, error => {
    //   this.notificationService.showError();
    // })
  }

  view(payment: any) {
    this.router.navigate(['/admin/payment/'+payment.PaymentId]);
  }

}
