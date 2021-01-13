import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.paymentDetailId === 0) { this.insertRecord(form); }
    else { this.updateRecord(form); }
 }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        // ngx-toastr component is found on from npmjs.com. Latest version is installed with 'npm i ngx-toastr'
        // ngx-toaster depends on @angular/animations: npm install @angular/animations --save
        // @angular/animation is already installed, see package.json
        // add toastr css to angular.json
        this.toastr.success('Created successfully', 'Payment Detail Register');
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        // ngx-toastr component is found on from npmjs.com. Latest version is installed with 'npm i ngx-toastr'
        // ngx-toaster depends on @angular/animations: npm install @angular/animations --save
        // @angular/animation is already installed, see package.json
        // add toastr css to angular.json
        this.toastr.info('Updated successfully', 'Payment Detail Register');
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }
}
