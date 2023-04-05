import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-setting-product-size-type',
  templateUrl: './setting-product-size-type.component.html',
  styleUrls: ['./setting-product-size-type.component.css'],
})
export class SettingProductSizeTypeComponent implements OnInit {
  productSizeTypeForm: FormGroup;
  id: number;
  isEditing: boolean;
  editMode: string;
  sizeDetails: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.get(AppModule.apiLink + 'productSizeTypes').subscribe((data) => {
      console.log(data);
      this.sizeDetails = data;
    });
    this.route.queryParams.subscribe((params) => {
      if (params['isEditing']) {
        this.isEditing = params['isEditing'];
        if (this.isEditing) {
          this.id = params['id'];
          this.editMode = params['edit'];
        }
      }
      this.initForm();
    });
  }

  initForm() {
    let productSizeType = '';
    let productSizes = '';
    let sizeRemarks = '';
    if (this.isEditing) {
      switch (this.editMode) {
        case 'size': {
          this.http
            .get(AppModule.apiLink + 'productSizeTypes/' + this.id)
            .subscribe((response) => {
              console.log(response);
              productSizeType = response['productSizeType'];
              productSizes = response['productSizes'];
              sizeRemarks = response['remarks'];
            });
          break;
        }
        default: {
          this.isEditing = false;
        }
      }
    }
    setTimeout(() => {
      this.productSizeTypeForm = new FormGroup({
        productSizeType: new FormControl(productSizeType),
        productSizes: new FormControl(productSizes),
        remarks: new FormControl(sizeRemarks),
      });
    }, 500);
  }

  onSubmitSize() {
    let newSize;
    if (this.isEditing) {
      newSize = {
        'productSizeTypeId': this.id,
        'productSizeType': this.productSizeTypeForm.value['productSizeType'],
        'productSizes': this.productSizeTypeForm.value['productSizes'],
        'remarks': this.productSizeTypeForm.value['remarks'],
      };
      this.http
      .put(AppModule.apiLink+'productSizeTypes', newSize)
      .subscribe((data) => {
        console.log(data);
        if (data['success'] === true) {
          alert('Product Size Type Updated Successfully!!!');
          this.productSizeTypeForm.reset();
        } else {
          alert(data['message']);
          this.productSizeTypeForm.reset();
        }
      });
    } else {
      newSize = {
        'productSizeType': this.productSizeTypeForm.value['productSizeType'],
        'productSizes': this.productSizeTypeForm.value['productSizes'],
        'remarks': this.productSizeTypeForm.value['remarks'],
      };
      this.http
        .post(AppModule.apiLink+'productcolors', newSize)
        .subscribe((data) => {
          console.log(data);
          if (data['success'] === true) {
            alert('Product Size Type Added Successfully!!!');
            this.productSizeTypeForm.reset();
          } else {
            alert(data['message']);
            this.productSizeTypeForm.reset();
          }
        });
    }
  }


  onEditSize(productSizeTypeId: number) {
    this.router.navigate(['./'], {
      queryParams: { isEditing: 'true', id: productSizeTypeId, edit: 'size' },
      relativeTo: this.route,
    });
  }
  onDeleteSize(productSizeTypeId: number) {
    this.http.delete(AppModule.apiLink+"productSizeTypes/"+productSizeTypeId).subscribe(
      data =>{
        console.log(data);
        if (data['success'] === true) {
          alert('Product Type Deleted Successfully!!!');
          this.productSizeTypeForm.reset();
        } else {
          alert(data['message']);
          this.productSizeTypeForm.reset();
        }
      }
    );
  }

  onCancel() {
    this.isEditing = false;
    this.productSizeTypeForm.reset();
    this.router.navigate(['./'], { relativeTo: this.route });
  }
}
