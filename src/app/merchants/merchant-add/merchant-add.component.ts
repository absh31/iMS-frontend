import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { ToastrServices } from 'src/app/services/toastr.services';

@Component({
  selector: 'app-merchant-add',
  templateUrl: './merchant-add.component.html',
  styleUrls: ['./merchant-add.component.css'],
})
export class MerchantAddComponent implements OnInit {
  dataFetched: boolean = false;
  merchantForm: FormGroup;
  citiesList: any;
  statesList: any;
  postData: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr : ToastrServices,
  ) {}

  ngOnInit(): void {
    this.getCitiesList()
      .then(() => this.getStatesList())
      .then(() => this.initForm())
      .then(() => {
        this.dataFetched = true;
      })
      .catch((error) => {
        console.log(error);
        this.toastr.success("Something went wrong");
      });
  }

  onSubmit() {
    this.getMerchantFormValues()
      .then(() => this.addMerchant())
      .then(() => {
        this.toastr.success("Merchant Added Successfully");
        this.merchantForm.reset();
        this.router.navigate(['../'], { relativeTo: this.route });
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error("Something went wrong");
      });
  }

  getMerchantFormValues() {
    const promise = new Promise((resolve, reject) => {
      let merchantName = this.merchantForm.value['merchantName'];
      let merchantGST = this.merchantForm.value['merchantGST'];
      let remarks = this.merchantForm.value['remarks'];
      let contactDetails = this.merchantForm.value['theContacts'];
      let emailDetails = this.merchantForm.value['theEmails'];
      let addressDetails = this.merchantForm.value['theAddress'];

      this.postData = {
        merchantName: merchantName,
        merchantGST: merchantGST,
        remarks: remarks,
        theContacts: contactDetails,
        theEmails: emailDetails,
        theAddress: addressDetails,
      };
      resolve(this.postData);
    });
    return promise;
  }

  addMerchant() {
    const promise = new Promise((resolve, reject) => {
      this.http.post(AppModule.apiLink + 'merchants', this.postData).subscribe(
        (data) => {
          if (data['success'] === true) {
            resolve(data);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
    return promise;
  }

  initForm() {
    const promise = new Promise((resolve, reject) => {
      let merchantName = '';
      let merchantGST = '';
      let remarks = '';
      let merchantContactDetails = new FormArray([]);
      let merchantEmailDetails = new FormArray([]);
      let merchantAddressDetails = new FormArray([]);

      this.merchantForm = new FormGroup({
        merchantName: new FormControl(merchantName, Validators.required),
        merchantGST: new FormControl(merchantGST, Validators.required),
        remarks: new FormControl(remarks),
        theContacts: merchantContactDetails,
        theEmails: merchantEmailDetails,
        theAddress: merchantAddressDetails,
      });
      resolve(this.merchantForm);
    });
  }

  getCitiesList() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'cities').subscribe(
        (data) => {
          this.citiesList = data;
          resolve(data);
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  getStatesList() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'states').subscribe(
        (data) => {
          this.statesList = data;
          resolve(data);
        },
        (error) => reject(error)
      );
    });
    return promise;
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

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
