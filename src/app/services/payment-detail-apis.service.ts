import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetPaymentDetailsResponse} from '../shared/get-payment-details-response';
import {PutPaymentDetailResponse} from '../shared/put-payment-detail-response';
import {PaymentDetail} from '../shared/payment-detail.model';
import {DeletePaymentDetailResponse} from '../shared/delete-payment-detail-response';
import {PostPaymentDetailResponse} from '../shared/post-payment-detail-response';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailApisService {
  constructor(private readonly http: HttpClient) { }

  readonly baseUrl = 'https://localhost:44318/api/PaymentDetail';

  getPaymentDetails(): Observable<GetPaymentDetailsResponse> {
    return this.http.get(this.baseUrl) as Observable<GetPaymentDetailsResponse>;
  }

  postPaymentDetail(paymentDetail: PaymentDetail): Observable<PostPaymentDetailResponse> {
    return this.http.post(this.baseUrl, paymentDetail) as Observable<PostPaymentDetailResponse>;
  }

  putPaymentDetail(paymentDetail: PaymentDetail): Observable<PutPaymentDetailResponse> {
    return this.http.put(`${this.baseUrl}/${paymentDetail.paymentDetailId}`, paymentDetail) as Observable<PutPaymentDetailResponse>;
  }

  deletePaymentDetail(paymentDetailId: number): Observable<DeletePaymentDetailResponse> {
    return this.http.delete(`${this.baseUrl}/${paymentDetailId}`) as Observable<DeletePaymentDetailResponse>;
  }
}
