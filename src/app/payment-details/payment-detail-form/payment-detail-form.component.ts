import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
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
    const onSuccess = (message: string) => {
      this.resetForm(form);
      this.service.refreshList();
      // ngx-toastr component is found on from npmjs.com. Latest version is installed with 'npm i ngx-toastr'
      // ngx-toaster depends on @angular/animations: npm install @angular/animations --save
      // @angular/animation is already installed, see package.json
      // add toastr css to angular.json
      this.toastrService.success(message, 'Payment Detail Register');
    };
    if (this.service.formPaymentDetailId() === 0) { this.insertRecord(form, onSuccess); }
    else { this.updateRecord(form, onSuccess); }
  }

  onResetForm(form: NgForm): void {
    this.resetForm(form);
  }

  insertRecord(form: NgForm, onSuccess: (message: string) => void): void {
    this.service.postPaymentDetail().subscribe(
      response => { onSuccess(`Created successfully ${response.id}`); },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm, onSuccess: (message: string) => void): void {
    this.service.putPaymentDetail().subscribe(
      response => { onSuccess('Updated successfully'); },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm): void {
    form.form.reset();
    this.service.populateForm(new PaymentDetail());
  }
}
