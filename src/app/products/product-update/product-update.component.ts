import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppModule } from 'src/app/app.module';
import { DbSaveService } from 'src/app/db-save.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent {
  id: number;
  dataFetched: boolean = false;
  productForm: FormGroup;
  productDetails: any;
  productTypes: any;
  productComboForm: FormGroup;
  productComboDetails: any;
  colors: any;
  sizes: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private dbSave: DbSaveService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.getProductDetails(this.id)
        .then(() => this.getProductComboDetails(this.id))
        .then(() => this.getProductTypes())
        .then(() => this.getColors())
        .then(() => this.getSizes())
        .then(() => this.initForm())
        .then(() => (this.dataFetched = true))
        .catch((error) => console.log(error));
    });
  }

  getProductDetails(id: number) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'products/'.concat(id.toString()))
        .subscribe(
          (data) => {
            this.productDetails = data;
            resolve(this.productDetails);
          },
          (error) => reject(error)
        );
    });
    return promise;
  }

  getProductComboDetails(id: number) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'productCombos/product/'.concat(id.toString()))
        .subscribe(
          (data) => {
            this.productComboDetails = data;
            resolve(this.productComboDetails);
          },
          (error) => reject(error)
        );
    });
    return promise;
  }

  getProductTypes() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'productTypes').subscribe(
        (data) => {
          this.productTypes = data;
          resolve(data);
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  onSubmitDetails() {
    this.dbSave
      .saveCheckPoint()
      .then(() => this.getDetailsForm())
      .then((data) => this.updateProductDetails(data))
      .then(() => this.dbSave.commitChanges())
      .then(() => {
        this.toastr.success('Product details updated');
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
        this.dbSave.rollbackToCheckPoint();
      });
  }

  getDetailsForm() {
    const promise = new Promise((resolve, reject) => {
      let productId = this.productForm.value['productId'];
      let productDesc = this.productForm.value['productDesc'];
      let productType = this.productForm.value['productType'];
      let productHSN = this.productForm.value['productHSN'];
      let remarks = this.productForm.value['remarks'];
      const data = {
        productId,
        productDesc,
        productType,
        productHSN,
        remarks,
      };
      resolve(data);
    });
    return promise;
  }

  getColors() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'productcolors').subscribe(
        (data) => {
          this.colors = data;
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
    return promise;
  }

  getSizes() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'productSizes').subscribe(
        (data) => {
          this.sizes = data;
          resolve(data);
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  updateProductDetails(data) {
    const promise = new Promise((resolve, reject) => {
      this.http.put(AppModule.apiLink + 'products', data).subscribe(
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

  onUpdateCombo(index: number) {
    const promise = new Promise((resolve, reject) => {
      let data = this.productComboForm.value['theProductCombo'][index];
      this.http.put(AppModule.apiLink + 'productCombos', data).subscribe(
        (data) => {
          this.toastr.success('Product Combination Updated Successfully!!!');
          resolve(data);
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  initForm() {
    this.initDetails()
      .then(() => this.initProductCombo())
      .catch((error) => console.log(error));
  }

  initDetails() {
    const promise = new Promise((resolve, reject) => {
      let productId = this.productDetails['productId'];
      let productDesc = this.productDetails['productDesc'];
      let productType = this.productDetails['productType'];
      let productHSN = this.productDetails['productHSN'];
      let remarks = this.productDetails['remarks'];

      this.productForm = new FormGroup({
        productId: new FormControl(productId, Validators.required),
        productDesc: new FormControl(productDesc, Validators.required),
        productType: new FormControl(productType, Validators.required),
        productHSN: new FormControl(productHSN, Validators.required),
        remarks: new FormControl(remarks),
      });
      resolve(this.productForm);
    });
    return promise;
  }

  initProductCombo() {
    const promise = new Promise((resolve, reject) => {
      this.productComboForm = new FormGroup({
        theProductCombo: new FormArray([]),
      });
      this.productComboDetails.forEach((productCombo) => {
        (<FormArray>this.productComboForm.get('theProductCombo')).push(
          new FormGroup({
            productComboId: new FormControl(productCombo['productComboId']),
            productSize: new FormControl({
              value: productCombo['productSize'],
              disabled: true,
            }),
            productColor: new FormControl({
              value: productCombo['productColor'],
              disabled: true,
            }),
            remarks: new FormControl(productCombo['remarks']),
          })
        );
      });
      resolve(this.productComboForm);
    });
    return promise;
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
