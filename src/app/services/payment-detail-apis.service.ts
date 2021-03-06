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
    return this.httpClient.get<PaymentDetails>(this.baseUrl);
  }

  postPaymentDetail(paymentDetail: PaymentDetail): Observable<PostPaymentDetailResponse> {
    return this.httpClient.post<PostPaymentDetailResponse>(this.baseUrl, paymentDetail);
  }

  putPaymentDetail(paymentDetail: PaymentDetail): Observable<PutPaymentDetailResponse> {
    return this.httpClient.put<PutPaymentDetailResponse>(`${this.baseUrl}/${paymentDetail.paymentDetailId}`, paymentDetail);
  }

  deletePaymentDetail(paymentDetailId: number): Observable<DeletePaymentDetailResponse> {
    return this.httpClient.delete<DeletePaymentDetailResponse>(`${this.baseUrl}/${paymentDetailId}`);
  }
}
