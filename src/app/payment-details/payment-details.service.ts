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

  private clearFormAndRefreshList(): void {
    this.clearForm();
    this.getPaymentDetails();
  }

  getPaymentDetails(): void { this.paymentDetailApis.getPaymentDetails().toPromise().then(response => this.list = response); }

  paymentDetails(): Array<PaymentDetail> { return this.list; }

  onResetForm(): void { this.clearForm(); }

  onSelectPaymentDetail(paymentDetail: PaymentDetail): void { this.populateForm(paymentDetail); }

  deletePaymentDetail(paymentDetail: PaymentDetail, onSuccess: (message: string) => void): void {
    this.paymentDetailApis.deletePaymentDetail(paymentDetail.paymentDetailId).subscribe(
      response => {
        onSuccess(`Card ${paymentDetail.cardNumber} deleted`);
        this.clearFormAndRefreshList();
      },
      err => { console.log(err); }
    );
  }

  insertPaymentDetail(onSuccess: (message: string) => void): void {
    this.paymentDetailApis.postPaymentDetail(this.formData).subscribe(
      response => {
        onSuccess(`Card created (${response.id})`);
        this.clearFormAndRefreshList();
        },
      err => { console.log(err); }
    );
  }

  updatePaymentDetail(onSuccess: (message: string) => void): void {
    this.paymentDetailApis.putPaymentDetail(this.formData).subscribe(
      response => {
        onSuccess(`Card ${this.formData.cardNumber} updated`);
        this.clearFormAndRefreshList();
      },
      err => { console.log(err); }
    );
  }
}
