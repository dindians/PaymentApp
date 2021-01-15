import { Injectable } from '@angular/core';
import { PaymentDetail } from '../shared/payment-detail.model';
import {PaymentDetailApisService} from '../services/payment-detail-apis.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {
  constructor(private readonly paymentDetailApis: PaymentDetailApisService) { }

  formData: PaymentDetail = new PaymentDetail();
  private list: PaymentDetail[];

  private populateForm(paymentDetail: PaymentDetail): void { this.formData = Object.assign({}, paymentDetail); }

  private clearForm(): void { this.populateForm(new PaymentDetail()); }

  getPaymentDetails(): void { this.paymentDetailApis.getPaymentDetails().toPromise().then(response => this.list = response); }

  paymentDetails(): Array<PaymentDetail> { return this.list; }

  onResetForm(): void { this.clearForm(); }

  onSelectPaymentDetail(paymentDetail: PaymentDetail): void { this.populateForm(paymentDetail); }

  onDeletePaymentDetail(): void {
    this.clearForm();
    this.getPaymentDetails();
  }

  onUpsertPaymentDetail(): void {
    this.clearForm();
    this.getPaymentDetails();
  }
}
