import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  types: any;
  sizeTypes: any;
  colors: any;
  sizes: any;
  colorObj = {};
  sizeObj = {};
  id: number;

  get selectedColorsArray() {
    return this.productForm.controls.SelectedColor as FormArray;
  }
  get selectedSizeArray() {
    return this.productForm.controls.SelectedSizes as FormArray;
  }
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService 
  ) {}

  private addCheckboxesToColorForm() {
    const promise = new Promise((resolve, reject) => {
      this.colors.forEach(() =>
        this.selectedColorsArray.push(new FormControl(false))
      );
      resolve(this.selectedColorsArray);
    });
    return promise;
  }

  private addCheckboxesToSizeForm() {
    const promise = new Promise((resolve, reject) => {
      this.selectedSizeArray.clear();
      this.sizes.forEach(() =>
        this.selectedSizeArray.push(new FormControl(false))
      );
      resolve(this.selectedSizeArray);
    });
    return promise;
  }

  ngOnInit(): void {
    this.getTypes()
      .then(() => this.getSizeTypes())
      .then(() => this.initForm())
      .then(() => this.getColors())
      .then(() => this.getColorObj())
      .then(() => this.addCheckboxesToColorForm())
      .catch((error) => console.log(error));
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

  getColorObj() {
    const promise = new Promise((resolve, reject) => {
      this.colors.forEach((color) => {
        this.colorObj[color.productColorId] = color.productColorName;
      });
      resolve(this.colorObj);
    });
    return promise;
  }

  removeAllCombos() {
    const promise = new Promise((resolve, reject) => {
      while ((<FormArray>this.productForm.get('combinations')).length) {
        (<FormArray>this.productForm.get('combinations')).removeAt(0);
      }
      resolve(this.productForm);
    });
    return promise;
  }

  getCombos() {
    this.removeAllCombos()
      .then(() => {
        setTimeout(() => {
          const selectedColors = this.productForm.value.SelectedColor.map(
            (checked, i) => (checked ? this.colors[i].productColorId : null)
          ).filter((v) => v !== null);

          const selectedSizes = this.productForm.value.SelectedSizes.map(
            (checked, i) => (checked ? this.sizes[i].productSizeId : null)
          ).filter((v) => v !== null);

          selectedColors.forEach((c) => {
            selectedSizes.forEach((s) => {
              (<FormArray>this.productForm.get('combinations')).push(
                new FormGroup({
                  productId: new FormControl(null),
                  productColor: new FormControl(c),
                  productSize: new FormControl(s),
                  remarks: new FormControl(null),
                })
              );
            });
          });
        }, 10);
      })
      .catch((error) => console.log(error));
  }

  onSubmit() {
    const data = {
      productDesc: this.productForm.value['productDesc'],
      productType: this.productForm.value['productType'],
      productHSN: this.productForm.value['productHSN'],
      remarks: this.productForm.value['remarks'],
    };

    this.addProduct(data)
      .then(() => this.addCombos())
      .then(() => {
        this.toastr.success('Product Added Successfully!!!');
        this.productForm.reset();
        this.router.navigate(['../'], { relativeTo: this.route });
      })
      .catch((error) => {
        this.productForm.reset();
        console.log(error);
      });
  }

  addProduct(data) {
    const promise = new Promise((resolve, reject) => {
      this.http.post(AppModule.apiLink + 'products', data).subscribe(
        (data) => {
          if (data) {
            this.id = data['timestamp'];
          }
          resolve(data);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
    return promise;
  }

  addCombos() {
    const promise = new Promise((resolve, reject) => {
      let combinations = this.productForm.value['combinations'];
      combinations.forEach((combo) => {
        combo.productId = this.id;
      });
      this.http
        .post(AppModule.apiLink + 'productCombos/many', combinations)
        .subscribe(
          (data) => {
            if (data['success']) {
              console.log('Combos Done');
            }
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
    return promise;
  }

  getSizeTypes() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'productSizeTypes').subscribe(
        (data) => {
          this.sizeTypes = data;
          resolve(data);
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  getTypes() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'productTypes').subscribe(
        (data) => {
          this.types = data;
          resolve(data);
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  initForm() {
    const promise = new Promise((resolve, reject) => {
      let productDesc = '';
      let productType = '';
      let productSizeType = '';
      let productHSN = '';
      let remarks = '';
      this.productForm = new FormGroup({
        productDesc: new FormControl(productDesc),
        productType: new FormControl(productType),
        productSizeType: new FormControl(productSizeType),
        productHSN: new FormControl(productHSN),
        remarks: new FormControl(remarks),
        SelectedColor: new FormArray([]),
        SelectedSizes: new FormArray([]),
        combinations: new FormArray([]),
      });
      resolve(this.productForm);
    });
    return promise;
  }

  onChangeSizeType() {
    this.getSizeType()
      .then(() => this.getSizeTypeObj())
      .then(() => this.addCheckboxesToSizeForm())
      .catch((error) => console.log(error));
  }

  getSizeTypeObj() {
    const promise = new Promise((resolve, reject) => {
      this.sizes.forEach((size) => {
        this.sizeObj[size.productSizeId] = size.productSize;
        resolve(this.sizeObj);
      });
    });
    return promise;
  }

  getSizeType() {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(
          AppModule.apiLink +
            'productSizes/' +
            this.productForm.value['productSizeType']
        )
        .subscribe(
          (data) => {
            this.sizes = data;
            resolve(data);
          },
          (error) => reject(error)
        );
    });
    return promise;
  }

  removeCombination(index: number) {
    (<FormArray>this.productForm.get('combinations')).removeAt(index);
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
