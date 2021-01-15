import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetailsService } from 'src/app/payment-details/payment-details.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {
  constructor(public readonly service: PaymentDetailsService, private readonly toastrService: ToastrService) { }

  ngOnInit(): void { }

  onSubmitForm(form: NgForm): void {
    // ngx-toastr component is found on from npmjs.com. Latest version is installed with 'npm i ngx-toastr'
    // ngx-toaster depends on @angular/animations: npm install @angular/animations --save
    // @angular/animation is already installed, see package.json
    // add toastr css to angular.json
    if (this.service.formData.paymentDetailId === 0) { this.service.insertPaymentDetail(message => this.toastrService.success(message, 'Payment Detail Register')); }
    else { this.service.updatePaymentDetail(message => this.toastrService.info(message, 'Payment Detail Register')); }
  }

  onResetForm(form: NgForm): void {
    this.resetForm(form);
  }

  private resetForm(form: NgForm): void {
    form.form.reset();
    this.service.onResetForm();
  }
}
