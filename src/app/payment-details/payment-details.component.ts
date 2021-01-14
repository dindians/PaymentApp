import { Component, OnInit } from '@angular/core';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailsService } from './payment-details.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {
  constructor(public readonly service: PaymentDetailsService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  onDelete(paymentDetail: PaymentDetail): void {
    if (confirm(`Are you sure to delete the card ${paymentDetail.cardNumber}?`)) {
      this.service.deletePaymentDetail(paymentDetail.paymentDetailId).subscribe(
        response => {
          this.service.refreshList();
          this.toastrService.error(`Card ${paymentDetail.cardNumber} deleted`, 'Payment Detail Register');
        },
        err => { console.log(err); }
      );
    }
  }
}
