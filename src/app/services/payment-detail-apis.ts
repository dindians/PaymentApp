import {Observable} from 'rxjs';
import {PaymentDetails} from './payment-details';
import {PaymentDetail} from './payment-detail';
import {PostPaymentDetailResponse} from './post-payment-detail-response';
import {PutPaymentDetailResponse} from './put-payment-detail-response';
import {DeletePaymentDetailResponse} from './delete-payment-detail-response';

export interface PaymentDetailApis {
  getPaymentDetails(): Observable<PaymentDetails>;
  postPaymentDetail(paymentDetail: PaymentDetail): Observable<PostPaymentDetailResponse>;
  putPaymentDetail(paymentDetail: PaymentDetail): Observable<PutPaymentDetailResponse>;
  deletePaymentDetail(paymentDetailId: number): Observable<DeletePaymentDetailResponse>;
}
