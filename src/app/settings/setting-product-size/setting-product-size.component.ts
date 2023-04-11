import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-setting-product-size',
  templateUrl: './setting-product-size.component.html',
  styleUrls: ['./setting-product-size.component.css'],
})
export class SettingProductSizeComponent implements OnInit {
  dataFetched: boolean;
  productSizeForm: FormGroup;
  id: number;
  isEditing: boolean;
  editMode: string;
  sizeTypes: any;
  sizeTypeDetails = {};
  sizes: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.get(AppModule.apiLink + 'productSizeTypes').subscribe((data) => {
      this.sizeTypes = data;
      this.getSizeTypeDetails();
    });
    this.http.get(AppModule.apiLink + 'productSizes').subscribe((data) => {
      this.sizes = data;
    });
    this.initForm();
  }

  getSizeTypeDetails() {
    this.sizeTypes.forEach((sizeType) => {
      this.sizeTypeDetails[sizeType['productSizeTypeId']] =
        sizeType['productSizeType'];
    });
    this.dataFetched = true;
  }

  initForm() {
    let productSizeTypeId = '';
    let productSize = '';
    let sizeRemarks = '';
    setTimeout(() => {
      this.productSizeForm = new FormGroup({
        productSizeTypeId: new FormControl(productSizeTypeId),
        productSize: new FormControl(productSize),
        remarks: new FormControl(sizeRemarks),
      });
    }, 500);
  }

  onSubmitSize() {
    let newSize: any;
    newSize = {
      productSizeTypeId: this.productSizeForm.value['productSizeTypeId'],
      productSize: this.productSizeForm.value['productSize'],
      remarks: this.productSizeForm.value['remarks'],
    };

    this.http
      .post(AppModule.apiLink + 'productSizes', newSize)
      .subscribe((data) => {
        console.log(data);
        if (data['success'] === true) {
          alert('Product Size Added Successfully!!!');
          this.productSizeForm.reset();
        } else {
          alert(data['message']);
          this.productSizeForm.reset();
        }
      });
  }

  onDeleteSize(productSizeId: number) {
    this.http
      .delete(AppModule.apiLink + 'productSizes/' + productSizeId)
      .subscribe((data) => {
        console.log(data);
        if (data['success'] === true) {
          alert('Product Size Deleted Successfully!!!');
          this.productSizeForm.reset();
        } else {
          alert(data['message']);
          this.productSizeForm.reset();
        }
      });
  }

  onCancel() {
    this.productSizeForm.reset();
    this.router.navigate(['./'], { relativeTo: this.route });
  }
}
