import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostPaymentDetailResponse} from './post-payment-detail-response';
import {PutPaymentDetailResponse} from './put-payment-detail-response';
import {DeletePaymentDetailResponse} from './delete-payment-detail-response';
import {GetPaymentDetailsResponse} from './get-payment-details-response';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  constructor(private http: HttpClient) { }

  readonly baseUrl = 'https://localhost:44318/api/PaymentDetail';
  formData: PaymentDetail = new PaymentDetail();
  list: PaymentDetail[];

  postPaymentDetail(): Observable<PostPaymentDetailResponse> {
    return this.http.post(this.baseUrl, this.formData) as Observable<PostPaymentDetailResponse>;
  }

  putPaymentDetail(): Observable<PutPaymentDetailResponse> {
    return this.http.put(`${this.baseUrl}/${this.formData.paymentDetailId}`, this.formData) as Observable<PutPaymentDetailResponse>;
  }

  deletePaymentDetail(paymentDetailId: number): Observable<DeletePaymentDetailResponse> {
    this.formData = new PaymentDetail();
    return this.http.delete(`${this.baseUrl}/${paymentDetailId}`) as Observable<DeletePaymentDetailResponse>;
  }

  getPaymentDetails(): Observable<GetPaymentDetailsResponse> {
    return this.http.get(this.baseUrl) as Observable<GetPaymentDetailsResponse>;
  }

  refreshList(): void {
    this.getPaymentDetails().toPromise().then(res => this.list = res);
  }
}
