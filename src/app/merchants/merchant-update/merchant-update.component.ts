import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { ToastrServices } from 'src/app/services/toastr.services';

@Component({
  selector: 'app-merchant-update',
  templateUrl: './merchant-update.component.html',
  styleUrls: ['./merchant-update.component.css'],
})
export class MerchantUpdateComponent {
  dataFetched: boolean = false;
  merchantForm: FormGroup;
  id: number;
  merchantDetails: any;
  theContacts: any;
  theEmails: any;
  theAddress: any;
  theContactsForm: FormGroup;
  theEmailsForm: FormGroup;
  theAddressForm: FormGroup;
  citiesList: any;
  statesList: any;
  newContactsForm: FormGroup;
  newEmailsForm: FormGroup;
  newAddressForm: FormGroup;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrServices
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.getMerchantDetails(this.id)
        .then(() => {
          this.getTheContacts();
          this.getTheEmails();
          this.getTheAddress();
        })
        .then(() => this.getCitiesList())
        .then(() => this.getStatesList())
        .then(() => this.initForm())
        .then(() => (this.dataFetched = true))
        .catch((error) => {
          console.log(error);
          this.toastr.error('Something went wrong');
        });
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

  getTheContacts() {
    this.theContacts = this.merchantDetails['theContacts'];
  }

  getTheEmails() {
    this.theEmails = this.merchantDetails['theEmails'];
  }

  getTheAddress() {
    this.theAddress = this.merchantDetails['theAddress'];
  }

  getMerchantDetails(id: number) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'merchants/'.concat(id.toString()))
        .subscribe(
          (data) => {
            this.merchantDetails = data;
            resolve(this.merchantDetails);
          },
          (error) => reject(error)
        );
    });
    return promise;
  }

  onSubmitDetails() {
    this.getDetailsForm()
      .then((data) => this.updateMerchantDetails(data))
      .then(() => {
        this.toastr.success('Merchant details updated!');
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
      });
  }

  getDetailsForm() {
    const promise = new Promise((resolve, reject) => {
      let merchantId = this.merchantForm.value['merchantId'];
      let merchantName = this.merchantForm.value['merchantName'];
      let merchantGST = this.merchantForm.value['merchantGST'];
      let remarks = this.merchantForm.value['remarks'];
      const data = {
        merchantId,
        merchantName,
        merchantGST,
        remarks,
      };
      resolve(data);
    });
    return promise;
  }

  updateMerchantDetails(data) {
    const promise = new Promise((resolve, reject) => {
      this.http.put(AppModule.apiLink + 'merchants', data).subscribe(
        (data) => {
          if (data['success'] === true) {
            resolve(data);
          }
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  onUpdateContacts(index: number) {
    this.updateContacts(index)
      .then(() => {
        this.toastr.success('Contact Updated Successfully');
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
      });
  }

  updateContacts(index: number) {
    const promise = new Promise((resolve, reject) => {
      let data = this.theContactsForm.value['theContacts'][index];
      this.http.put(AppModule.apiLink + 'contacts', data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  onUpdateEmails(index: number) {
    this.updateEmails(index)
      .then(() => {
        this.toastr.success('Email Updated Successfully');
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
      });
  }

  updateEmails(index: number) {
    const promise = new Promise((resolve, reject) => {
      let data = this.theEmailsForm.value['theEmails'][index];
      this.http.put(AppModule.apiLink + 'emails', data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  onUpdateAddress(index: number) {
    this.updateAddress(index)
      .then(() => {
        this.toastr.success('Address Updated Successfully');
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
      });
  }

  updateAddress(index: number) {
    const promise = new Promise((resolve, reject) => {
      let data = this.theAddressForm.value['theAddress'][index];
      this.http.put(AppModule.apiLink + 'address', data).subscribe(
        (data) => {
          this.toastr.success('Address Updated Successfully');
          resolve(data);
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  initForm() {
    this.initDetails()
      .then(() => this.initContacts())
      .then(() => this.initEmails())
      .then(() => this.initAddress())
      .then(() => this.initNewContacts())
      .then(() => this.initNewEmails())
      .then(() => this.initNewAddress())
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
      });
  }

  initDetails() {
    const promise = new Promise((resolve, reject) => {
      let merchantId = this.merchantDetails['merchantId'];
      let merchantName = this.merchantDetails['merchantName'];
      let merchantGST = this.merchantDetails['merchantGST'];
      let remarks = this.merchantDetails['remarks'];

      this.merchantForm = new FormGroup({
        merchantId: new FormControl(merchantId, Validators.required),
        merchantName: new FormControl(merchantName, Validators.required),
        merchantGST: new FormControl(merchantGST, Validators.required),
        remarks: new FormControl(remarks),
      });
      resolve(this.merchantForm);
    });
    return promise;
  }

  initContacts() {
    const promise = new Promise((resolve, reject) => {
      this.theContactsForm = new FormGroup({
        theContacts: new FormArray([]),
      });
      this.theContacts.forEach((contact) => {
        (<FormArray>this.theContactsForm.get('theContacts')).push(
          new FormGroup({
            contactId: new FormControl(contact['contactId']),
            contactMerchantId: new FormControl(contact['contactMerchantId']),
            contactType: new FormControl(contact['contactType']),
            contactNo: new FormControl(contact['contactNo']),
            remarks: new FormControl(contact['remarks']),
          })
        );
      });
      resolve(this.theContactsForm);
    });
    return promise;
  }

  initNewContacts() {
    const promise = new Promise((resolve, reject) => {
      this.newContactsForm = new FormGroup({
        theNewContacts: new FormArray([]),
      });
      resolve(this.newContactsForm);
    });
    return promise;
  }

  addContacts() {
    (<FormArray>this.newContactsForm.get('theNewContacts')).push(
      new FormGroup({
        contactMerchantId: new FormControl(this.id),
        contactType: new FormControl(null),
        contactNo: new FormControl(null),
        remarks: new FormControl(null),
      })
    );
  }

  removeNewContact(index: number) {
    (<FormArray>this.newContactsForm.get('theNewContacts')).removeAt(index);
  }

  onSaveNewContact(index: number) {
    this.saveNewContact(index)
      .then(() => {
        this.toastr.success('New Contact Saved Successfully');
        this.removeNewContact(index);
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
      });
  }

  saveNewContact(index: number) {
    let data = this.newContactsForm.value['theNewContacts'][index];
    const promise = new Promise((resolve, reject) => {
      this.http.post(AppModule.apiLink + 'contacts', data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  initEmails() {
    const promise = new Promise((resolve, reject) => {
      this.theEmailsForm = new FormGroup({
        theEmails: new FormArray([]),
      });
      this.theEmails.forEach((email) => {
        (<FormArray>this.theEmailsForm.get('theEmails')).push(
          new FormGroup({
            emailId: new FormControl(email['emailId']),
            emailMerchantId: new FormControl(email['emailMerchantId']),
            emailType: new FormControl(email['emailType']),
            email: new FormControl(email['email']),
            remarks: new FormControl(email['remarks']),
          })
        );
      });
      resolve(this.theEmailsForm);
    });
    return promise;
  }

  initNewEmails() {
    const promise = new Promise((resolve, reject) => {
      this.newEmailsForm = new FormGroup({
        theNewEmails: new FormArray([]),
      });
      resolve(this.newEmailsForm);
    });
    return promise;
  }

  addEmails() {
    (<FormArray>this.newEmailsForm.get('theNewEmails')).push(
      new FormGroup({
        emailMerchantId: new FormControl(this.id),
        emailType: new FormControl(null),
        email: new FormControl(null),
        remarks: new FormControl(null),
      })
    );
  }

  removeNewEmail(index: number) {
    (<FormArray>this.newEmailsForm.get('theNewEmails')).removeAt(index);
  }

  onSaveNewEmail(index: number) {
    this.saveNewEmail(index)
      .then(() => {
        this.toastr.success('New Email Saved Successfully');
        this.removeNewEmail(index);
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
      });
  }

  saveNewEmail(index: number) {
    let data = this.newEmailsForm.value['theNewEmails'][index];
    const promise = new Promise((resolve, reject) => {
      this.http.post(AppModule.apiLink + 'emails', data).subscribe(
        (data) => {
          if (data['success']) {
            this.toastr.success('New Email Saved Successfully!!!');
            this.removeNewEmail(index);
            resolve(data);
          }
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  initAddress() {
    const promise = new Promise((resolve, reject) => {
      this.theAddressForm = new FormGroup({
        theAddress: new FormArray([]),
      });
      this.theAddress.forEach((address) => {
        (<FormArray>this.theAddressForm.get('theAddress')).push(
          new FormGroup({
            addressId: new FormControl(address['addressId']),
            addressMerchantId: new FormControl(address['addressMerchantId']),
            addressLine1: new FormControl(address['addressLine1']),
            addressLine2: new FormControl(address['addressLine2']),
            addressCity: new FormControl(address['addressCity']),
            addressState: new FormControl(address['addressState']),
            addressPincode: new FormControl(address['addressPincode']),
            remarks: new FormControl(address['remarks']),
          })
        );
      });
      resolve(this.theAddressForm);
    });
    return promise;
  }

  initNewAddress() {
    const promise = new Promise((resolve, reject) => {
      this.newAddressForm = new FormGroup({
        theNewAddress: new FormArray([]),
      });
      resolve(this.newAddressForm);
    });
    return promise;
  }

  addAddress() {
    (<FormArray>this.newAddressForm.get('theNewAddress')).push(
      new FormGroup({
        addressMerchantId: new FormControl(this.id),
        addressLine1: new FormControl(null),
        addressLine2: new FormControl(null),
        addressCity: new FormControl(null),
        addressState: new FormControl(null),
        addressPincode: new FormControl(null),
        remarks: new FormControl(null),
      })
    );
  }

  removeNewAddress(index: number) {
    (<FormArray>this.newAddressForm.get('theNewAddress')).removeAt(index);
  }

  onSaveNewAddress(index: number) {
    this.saveNewAddress(index)
      .then(() => {
        this.toastr.success('New Address Saved Successfully');
        this.removeNewAddress(index);
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
      });
  }

  saveNewAddress(index: number) {
    let data = this.newAddressForm.value['theNewAddress'][index];
    const promise = new Promise((resolve, reject) => {
      this.http.post(AppModule.apiLink + 'address', data).subscribe(
        (data) => {
          if (data['success']) {
            this.toastr.success('New Address Saved Successfully!!!');
            this.removeNewAddress(index);
            resolve(data);
          }
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
