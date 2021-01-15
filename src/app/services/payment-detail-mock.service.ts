import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {PaymentDetailApis} from './payment-detail-apis';
import {PaymentDetails} from './payment-details';
import {PaymentDetail} from './payment-detail';
import {PostPaymentDetailResponse} from './post-payment-detail-response';
import {PutPaymentDetailResponse} from './put-payment-detail-response';
import {DeletePaymentDetailResponse} from './delete-payment-detail-response';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailMockService implements PaymentDetailApis {
  constructor() { }

  private readonly paymentDetailsMap: Map<number, PaymentDetail> = new Map<number, PaymentDetail>();
  private nextPaymentDetailId = 1;
  private getNextPaymentDetailId(): number { return this.nextPaymentDetailId++; }

  getPaymentDetails(): Observable<PaymentDetails> {
//    return of(Array.from(this.paymentDetailsMap.values()));
    return of([...this.paymentDetailsMap.values()]);
  }

  postPaymentDetail(paymentDetail: PaymentDetail): Observable<PostPaymentDetailResponse> {
    paymentDetail.paymentDetailId = this.getNextPaymentDetailId();
    this.paymentDetailsMap.set(paymentDetail.paymentDetailId, paymentDetail);
    const response = new PostPaymentDetailResponse();
    response.id = paymentDetail.paymentDetailId;
    return of(response);
  }

  putPaymentDetail(paymentDetail: PaymentDetail): Observable<PutPaymentDetailResponse> {
    this.paymentDetailsMap.set(paymentDetail.paymentDetailId, paymentDetail);
    return of(new PutPaymentDetailResponse());
  }

  deletePaymentDetail(paymentDetailId: number): Observable<DeletePaymentDetailResponse> {
    this.paymentDetailsMap.delete(paymentDetailId);
    return of(new DeletePaymentDetailResponse());
  }
}
