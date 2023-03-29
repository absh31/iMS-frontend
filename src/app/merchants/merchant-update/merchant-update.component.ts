import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { Merchant } from '../merchant.model';

@Component({
  selector: 'app-merchant-update',
  templateUrl: './merchant-update.component.html',
  styleUrls: ['./merchant-update.component.css'],
})
export class MerchantUpdateComponent {
  merchantForm: FormGroup;
  id: number;
  merchantDetails: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.getMerchantDetails(this.id);
    });
  }

  getMerchantDetails(id: number) {
    this.http
      .get(AppModule.apiLink+'merchants/'.concat(id.toString()))
      .subscribe((data) => {
        this.merchantDetails = data;
        this.initForm();
        console.log(data);
      });
  }

  onSubmit() {
    let merchantId = this.merchantForm.value['merchantId'];
    let merchantType = this.merchantForm.value['merchantType'];
    let merchantName = this.merchantForm.value['merchantName'];
    let merchantGST = this.merchantForm.value['merchantGST'];
    let remarks = this.merchantForm.value['remarks'];
    const data = {
      merchantId,
      merchantType,
      merchantName,
      merchantGST,
      remarks,
    };

    this.http
      .put(AppModule.apiLink+'merchants', data)
      .subscribe((data) => {
        console.log(data);
        if (data['success'] === true) {
          alert('Merchant Updated Successfully!!!');
          this.merchantForm.reset();
          this.router.navigate(['../../'], { relativeTo: this.route });
        } else {
          alert(data['message']);
          this.merchantForm.reset();
        }
      });
  }

  initForm() {
    let merchantId = this.merchantDetails['merchantId'];
    let merchantType = this.merchantDetails['merchantType'];
    let merchantName = this.merchantDetails['merchantName'];
    let merchantGST = this.merchantDetails['merchantGST'];
    let remarks = this.merchantDetails['remarks'];

    this.merchantForm = new FormGroup({
      merchantId: new FormControl(merchantId, Validators.required),
      merchantType: new FormControl(merchantType, Validators.required),
      merchantName: new FormControl(merchantName, Validators.required),
      merchantGST: new FormControl(merchantGST, Validators.required),
      remarks: new FormControl(remarks),
    });
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
