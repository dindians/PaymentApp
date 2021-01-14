import { Component, OnInit } from '@angular/core';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(paymentDetail: PaymentDetail): void {
    // need a temporary object because of two-way binding between service.formData and the html form object.
    this.service.formData = Object.assign({}, paymentDetail);
  }

  onDelete(paymentDetail: PaymentDetail): void {
    if (confirm(`Are you sure to delete the card ${paymentDetail.cardNumber}?`)) {
      this.service.deletePaymentDetail(paymentDetail.paymentDetailId).subscribe(
        res => {
          this.service.refreshList();
          this.toastr.error(`Card ${paymentDetail.cardNumber} deleted`, 'Payment Detail Register');
        },
        err => { console.log(err); }
      );
    }
  }
}
