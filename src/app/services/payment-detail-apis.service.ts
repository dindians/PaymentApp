import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaymentDetail} from './payment-detail';
import {PaymentDetails} from './payment-details';
import {PutPaymentDetailResponse} from './put-payment-detail-response';
import {DeletePaymentDetailResponse} from './delete-payment-detail-response';
import {PostPaymentDetailResponse} from './post-payment-detail-response';
import {PaymentDetailApis} from './payment-detail-apis';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailApisService implements PaymentDetailApis {
  constructor(private readonly httpClient: HttpClient) { }

  readonly baseUrl = 'https://localhost:44318/api/PaymentDetail';

  getPaymentDetails(): Observable<PaymentDetails> {
    return this.httpClient.get(this.baseUrl) as Observable<PaymentDetails>;
  }

  postPaymentDetail(paymentDetail: PaymentDetail): Observable<PostPaymentDetailResponse> {
    return this.httpClient.post(this.baseUrl, paymentDetail) as Observable<PostPaymentDetailResponse>;
  }

  putPaymentDetail(paymentDetail: PaymentDetail): Observable<PutPaymentDetailResponse> {
    return this.httpClient.put(`${this.baseUrl}/${paymentDetail.paymentDetailId}`, paymentDetail) as Observable<PutPaymentDetailResponse>;
  }

  deletePaymentDetail(paymentDetailId: number): Observable<DeletePaymentDetailResponse> {
    return this.httpClient.delete(`${this.baseUrl}/${paymentDetailId}`) as Observable<DeletePaymentDetailResponse>;
  }
}
