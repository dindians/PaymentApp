import { Injectable } from '@angular/core';
import { PaymentDetail } from '../services/payment-detail';
import {PaymentDetailApisService} from '../services/payment-detail-apis.service';
import {PaymentDetails} from '../services/payment-details';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsInteraction {
  constructor(private readonly paymentDetailApis: PaymentDetailApisService) { }  // PaymentDetailApisService | PaymentDetailMockService
  /** payment detail form data */
  formData: PaymentDetail = new PaymentDetail();
  /** payment detail list data */
  list: PaymentDetails;

  private populateForm(paymentDetail: PaymentDetail): void { this.formData = Object.assign({}, paymentDetail); }

  private clearForm(): void { this.populateForm(new PaymentDetail()); }

  private clearFormAndRefreshList(): void {
    this.clearForm();
    this.refreshList();
  }

  refreshList(): void { this.paymentDetailApis.getPaymentDetails().toPromise().then(response => this.list = response); }

  resetForm(): void { this.clearForm(); }

  selectListItem(paymentDetail: PaymentDetail): void { this.populateForm(paymentDetail); }

  deleteListItem(paymentDetail: PaymentDetail, onSuccess: (message: string) => void): void {
    this.paymentDetailApis.deletePaymentDetail(paymentDetail.paymentDetailId).subscribe(
      response => {
        onSuccess(`Card ${paymentDetail.cardNumber} deleted`);
        this.clearFormAndRefreshList();
      },
      err => { console.log(err); }
    );
  }

  insertFromFormData(onSuccess: (message: string) => void): void {
    this.paymentDetailApis.postPaymentDetail(this.formData).subscribe(
      response => {
        onSuccess(`Card created (${response.id})`);
        this.clearFormAndRefreshList();
        },
      err => { console.log(err); }
    );
  }

  updateFromFormData(onSuccess: (message: string) => void): void {
    this.paymentDetailApis.putPaymentDetail(this.formData).subscribe(
      response => {
        onSuccess(`Card ${this.formData.cardNumber} updated`);
        this.clearFormAndRefreshList();
      },
      err => { console.log(err); }
    );
  }
}
