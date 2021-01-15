import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetailsService } from 'src/app/payment-details/payment-details.service';
import {PaymentDetailApisService} from '../../services/payment-detail-apis.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {
  constructor(public readonly service: PaymentDetailsService,
              private readonly toastrService: ToastrService,
              private readonly paymentDetailApis: PaymentDetailApisService) { }

  ngOnInit(): void { }

  onSubmitForm(form: NgForm): void {
    const onSuccess = (message: string) => {
      this.service.onUpsertPaymentDetail();
      // ngx-toastr component is found on from npmjs.com. Latest version is installed with 'npm i ngx-toastr'
      // ngx-toaster depends on @angular/animations: npm install @angular/animations --save
      // @angular/animation is already installed, see package.json
      // add toastr css to angular.json
      this.toastrService.success(message, 'Payment Detail Register');
    };
    if (this.service.formData.paymentDetailId === 0) { this.insertRecord(form, onSuccess); }
    else { this.updateRecord(form, onSuccess); }
  }

  onResetForm(form: NgForm): void {
    this.resetForm(form);
  }

  private insertRecord(form: NgForm, onSuccess: (message: string) => void): void {
    this.paymentDetailApis.postPaymentDetail(this.service.formData).subscribe(
      response => { onSuccess(`Card created (${response.id})`); },
      err => { console.log(err); }
    );
  }

  private updateRecord(form: NgForm, onSuccess: (message: string) => void): void {
    this.paymentDetailApis.putPaymentDetail(this.service.formData).subscribe(
      response => { onSuccess(`Card ${this.service.formData.cardNumber} updated`); },
      err => { console.log(err); }
    );
  }

  private resetForm(form: NgForm): void {
    form.form.reset();
    this.service.onResetForm();
  }
}
