import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private router: Router,
    private toastr: ToastrService 
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
        if (data['success'] === true) {
          this.toastr.success('Product Size Added Successfully!!!');
          this.productSizeForm.reset();
        } else {
          console.log(data['message']);
          this.toastr.error('Something went wrong');
          this.productSizeForm.reset();
        }
      });
  }

  onDeleteSize(productSizeId: number) {
    this.http
      .delete(AppModule.apiLink + 'productSizes/' + productSizeId)
      .subscribe((data) => {
        if (data['success'] === true) {
          this.toastr.success('Product Size Added Successfully!!!');
          this.productSizeForm.reset();
        } else {
          console.log(data['message']);
          this.toastr.error('Something went wrong');
          this.productSizeForm.reset();
        }
      });
  }

  onCancel() {
    this.productSizeForm.reset();
    this.router.navigate(['./'], { relativeTo: this.route });
  }
}
