import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Merchant } from '../merchant.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-merchant-add',
  templateUrl: './merchant-add.component.html',
  styleUrls: ['./merchant-add.component.css'],
})
export class MerchantAddComponent implements OnInit {
  

  merchantForm: FormGroup;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {``
    this.initForm();
  }

  onSubmit() {
    let merchantName = this.merchantForm.value['merchantName'];
    let merchantGST = this.merchantForm.value['merchantGST'];
    let remarks = this.merchantForm.value['remarks'];
    let contactDetails = this.merchantForm.value['theContacts'];
    let emailDetails = this.merchantForm.value['theEmails'];
    let addressDetails = this.merchantForm.value['theAddress'];
    const newMerchant = new Merchant(
      null,
      merchantName,
      merchantGST,
      remarks,
      contactDetails,
      emailDetails,
      addressDetails
    );
    let data = JSON.parse(JSON.stringify(newMerchant));

    this.http
      .post(AppModule.apiLink+'merchants', data)
      .subscribe((data) => {
        console.log(data);
        if (data['success'] === true) {
          alert('Merchant Added Successfully!!!');
          this.merchantForm.reset();
          this.router.navigate(['../'], { relativeTo: this.route });
        } else {
          alert(data['message']);
          this.merchantForm.reset();
        }
      });
  }

  initForm() {
    let merchantName = '';
    let merchantGST = '';
    let remarks = '';
    let merchantContactDetails = new FormArray([
      // new FormGroup({
      //   contactType: new FormControl(null),
      //   contactNo: new FormControl(null),
      //   remarks: new FormControl(null),
      // }),
    ]);
    let merchantEmailDetails = new FormArray([
      // new FormGroup({
      //   emailType: new FormControl(null),
      //   email: new FormControl(null),
      //   remarks: new FormControl(null),
      // }),
    ]);
    let merchantAddressDetails = new FormArray([
      // new FormGroup({
      //   addressLine1: new FormControl(null, Validators.required),
      //   addressLine2: new FormControl(null, Validators.required),
      //   addressCity: new FormControl(null, Validators.required),
      //   addressState: new FormControl(null, Validators.required),
      //   addressPincode: new FormControl(null, Validators.required),
      //   remarks: new FormControl(null),
      // }),
    ]);

    this.merchantForm = new FormGroup({
      merchantName: new FormControl(merchantName, Validators.required),
      merchantGST: new FormControl(merchantGST, Validators.required),
      remarks: new FormControl(remarks),
      theContacts: merchantContactDetails,
      theEmails: merchantEmailDetails,
      theAddress: merchantAddressDetails,
    });
  }

  addContactDetails() {
    (<FormArray>this.merchantForm.get('theContacts')).push(
      new FormGroup({
        contactType: new FormControl(null, Validators.required),
        contactNo: new FormControl(null, Validators.required),
        remarks: new FormControl(null),
      })
    );
  }

  removeContactDetails(index: number) {
    (<FormArray>this.merchantForm.get('theContacts')).removeAt(index);
  }

  addEmailDetails() {
    (<FormArray>this.merchantForm.get('theEmails')).push(
      new FormGroup({
        emailType: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required),
        remarks: new FormControl(null),
      })
    );
  }

  removeEmailDetails(index: number) {
    (<FormArray>this.merchantForm.get('theEmails')).removeAt(index);
  }

  addAddressDetails() {
    (<FormArray>this.merchantForm.get('theAddress')).push(
      new FormGroup({
        addressLine1: new FormControl(null, Validators.required),
        addressLine2: new FormControl(null, Validators.required),
        addressCity: new FormControl(null, Validators.required),
        addressState: new FormControl(null, Validators.required),
        addressPincode: new FormControl(null, Validators.required),
        remarks: new FormControl(null),
      })
    );
  }

  removeAddressDetails(index: number) {
    (<FormArray>this.merchantForm.get('theAddress')).removeAt(index);
  }

  onBack(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
