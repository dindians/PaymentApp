import { Injectable } from '@angular/core';
import { PaymentDetail } from '../shared/payment-detail.model';
import {Observable} from 'rxjs';
import {PostPaymentDetailResponse} from '../shared/post-payment-detail-response';
import {PutPaymentDetailResponse} from '../shared/put-payment-detail-response';
import {DeletePaymentDetailResponse} from '../shared/delete-payment-detail-response';
import {PaymentDetailApisService} from '../services/payment-detail-apis.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {
  constructor(private readonly paymentDetailApis: PaymentDetailApisService) { }

  formData: PaymentDetail = new PaymentDetail();
  private list: PaymentDetail[];

  populateForm(paymentDetail: PaymentDetail): void {
    this.formData = Object.assign({}, paymentDetail);
  }

  formPaymentDetailId(): number {
    return this.formData.paymentDetailId;
  }

  getList(): Array<PaymentDetail> {
    return this.list;
  }

  postPaymentDetail(): Observable<PostPaymentDetailResponse> {
    return this.paymentDetailApis.postPaymentDetail(this.formData);
  }

  putPaymentDetail(): Observable<PutPaymentDetailResponse> {
    return this.paymentDetailApis.putPaymentDetail(this.formData);
  }

  deletePaymentDetail(paymentDetailId: number): Observable<DeletePaymentDetailResponse> {
    this.formData = new PaymentDetail();
    return this.paymentDetailApis.deletePaymentDetail(paymentDetailId);
  }

  refreshList(): void {
    this.paymentDetailApis.getPaymentDetails().toPromise().then(response => this.list = response);
  }
}
