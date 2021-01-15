import { Component, OnInit } from '@angular/core';
import {PaymentDetailsInteraction} from 'src/app/payment-details/payment-details-interaction';
import {ToastrService} from 'ngx-toastr';
import {PaymentDetail} from 'src/app/services/payment-detail';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styleUrls: ['./payment-detail-list.component.css']
})
export class PaymentDetailListComponent implements OnInit {
  constructor(public readonly service: PaymentDetailsInteraction, private toastrService: ToastrService) { }
  ngOnInit(): void {
    this.service.refreshList();
  }

  onDelete(paymentDetail: PaymentDetail): void {
    if (confirm(`Are you sure to delete the card ${paymentDetail.cardNumber}?`)) {
      this.service.deleteListItem(paymentDetail, message => this.toastrService.error(message, 'Payment Detail Register'));
    }
  }
}
