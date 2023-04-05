import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-setting-product-type',
  templateUrl: './setting-product-type.component.html',
  styleUrls: ['./setting-product-type.component.css'],
})
export class SettingProductTypeComponent {
  productTypeForm: FormGroup;
  id: number;
  isEditing: boolean;
  editMode: string;
  typeDetails: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.get(AppModule.apiLink + 'productTypes').subscribe((data) => {
      console.log(data);
      this.typeDetails = data;
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
    let productType = '';
    let typeRemarks = '';
    if (this.isEditing) {
      switch (this.editMode) {
        case 'type': {
          this.http
            .get(AppModule.apiLink + 'productTypes/' + this.id)
            .subscribe((response) => {
              console.log(response);
              productType = response['productType'];
              typeRemarks = response['remarks'];
            });
          break;
        }
        default: {
          this.isEditing = false;
        }
      }
    }
    setTimeout(() => {
      this.productTypeForm = new FormGroup({
        productType: new FormControl(productType),
        remarks: new FormControl(typeRemarks),
      });
    }, 500);
  }

  onSubmitType() {
    let newType;
    if (this.isEditing) {
      newType = {
        productTypeId: this.id,
        productType: this.productTypeForm.value['productType'],
        remarks: this.productTypeForm.value['remarks'],
      };
      this.http
        .put(AppModule.apiLink + 'productTypes', newType)
        .subscribe((data) => {
          console.log(data);
          if (data['success'] === true) {
            alert('Product Type Updated Successfully!!!');
            this.productTypeForm.reset();
            this.http
              .get(AppModule.apiLink + 'productTypes')
              .subscribe((data) => {
                console.log(data);
                this.typeDetails = data;
              });
          } else {
            alert(data['message']);
            this.productTypeForm.reset();
          }
        });
    } else {
      newType = {
        productType: this.productTypeForm.value['productType'],
        remarks: this.productTypeForm.value['remarks'],
      };
      this.http
        .post(AppModule.apiLink + 'productTypes', newType)
        .subscribe((data) => {
          console.log(data);
          if (data['success'] === true) {
            alert('Product Type Added Successfully!!!');
            this.productTypeForm.reset();
          } else {
            alert(data['message']);
            this.productTypeForm.reset();
          }
        });
      this.onCancel();
    }
  }

  onEditType(productTypeId: number) {
    this.router.navigate(['./'], {
      queryParams: { isEditing: 'true', id: productTypeId, edit: 'type' },
      relativeTo: this.route,
    });
  }
  onDeleteType(productTypeId: number) {
    this.http
      .delete(AppModule.apiLink + 'productTypes/' + productTypeId)
      .subscribe((data) => {
        console.log(data);
        if (data['success'] === true) {
          alert('Product Type Deleted Successfully!!!');
          this.productTypeForm.reset();
        } else {
          alert(data['message']);
          this.productTypeForm.reset();
        }
      });
  }

  onCancel() {
    this.isEditing = false;
    this.productTypeForm.reset();
    this.router.navigate(['./'], { relativeTo: this.route });
  }
}
