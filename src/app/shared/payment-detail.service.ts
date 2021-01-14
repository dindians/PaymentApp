import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  constructor(private http: HttpClient) { }

  readonly baseUrl = 'https://localhost:44318/api/PaymentDetail';
  formData: PaymentDetail = new PaymentDetail();
  list: PaymentDetail[];

  postPaymentDetail(): Observable<any> {
    return this.http.post(this.baseUrl, this.formData) as Observable<any>;
  }

  putPaymentDetail(): Observable<any> {
    return this.http.put(`${this.baseUrl}/${this.formData.paymentDetailId}`, this.formData);
  }

  deletePaymentDetail(paymentDetailId: number): Observable<any> {
    this.formData = new PaymentDetail();
    return this.http.delete(`${this.baseUrl}/${paymentDetailId}`);
  }

  refreshList(): void {
    this.http.get(this.baseUrl).toPromise().then(res => this.list = res as PaymentDetail[]);
  }
}
