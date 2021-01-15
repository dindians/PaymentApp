import { Component, OnInit } from '@angular/core';
import {PaymentDetailsService} from 'src/app/payment-details/payment-details.service';
import {ToastrService} from 'ngx-toastr';
import {PaymentDetail} from 'src/app/shared/payment-detail.model';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styleUrls: ['./payment-detail-list.component.css']
})
export class PaymentDetailListComponent implements OnInit {
  constructor(public readonly service: PaymentDetailsService, private toastrService: ToastrService) { }
  ngOnInit(): void {
    this.service.getPaymentDetails();
  }

  onDelete(paymentDetail: PaymentDetail): void {
    if (confirm(`Are you sure to delete the card ${paymentDetail.cardNumber}?`)) {
      this.service.deletePaymentDetail(paymentDetail, message => this.toastrService.error(message, 'Payment Detail Register'));
    }
  }
}
