import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { Subject } from 'rxjs';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  refreshComponent = new Subject<SettingsComponent>();
  productTypeForm: FormGroup;
  productColorForm: FormGroup;
  productSizeTypeForm: FormGroup;
  id: number;
  isEditing: boolean;
  editMode: string;
  typeDetails: any;
  colorDetails: any;
  sizeDetails: any;

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
    this.http.get(AppModule.apiLink + 'productcolors').subscribe((data) => {
      console.log(data);
      this.colorDetails = data;
    });
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
    let productType = '';
    let productColor = '';
    let productSizeType = '';
    let productSizes = '';
    let typeRemarks = '';
    let colorRemarks = '';
    let sizeRemarks = '';
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
        case 'color': {
          this.http
            .get(AppModule.apiLink + 'productcolors/' + this.id)
            .subscribe((response) => {
              console.log(response);
              productColor = response['productColorName'];
              console.log(productColor);
              colorRemarks = response['remarks'];
            });
          break;
        }
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
      this.productTypeForm = new FormGroup({
        'productType': new FormControl(productType),
        'remarks': new FormControl(typeRemarks),
      });
      this.productColorForm = new FormGroup({
        'productColorName': new FormControl(productColor),
        'remarks': new FormControl(colorRemarks),
      });
      this.productSizeTypeForm = new FormGroup({
        'productSizeType': new FormControl(productSizeType),
        'productSizes': new FormControl(productSizes),
        'remarks': new FormControl(sizeRemarks),
      });
    }, 500);
  }

  onSubmitType() {
    let newType;
    if (this.isEditing) {
      newType = {
        'productTypeId': this.id,
        'productType': this.productTypeForm.value['productType'],
        'remarks': this.productTypeForm.value['remarks'],
      };
      this.http
      .put(AppModule.apiLink + 'productTypes', newType)
      .subscribe((data) => {
        console.log(data);
        if (data['success'] === true) {
          alert('Product Type Updated Successfully!!!');
          this.productTypeForm.reset();
          this.http.get(AppModule.apiLink + 'productTypes').subscribe((data) => {
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
        'productType': this.productTypeForm.value['productType'],
        'remarks': this.productTypeForm.value['remarks'],
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

  onSubmitColor() {
    let newColor;
    if (this.isEditing) {
      newColor = {
        'productColorId': this.id,
        'productColorName': this.productColorForm.value['productColorName'],
        'remarks': this.productColorForm.value['remarks'],
      };
      this.http
      .put('http://192.1.200.123:8080/ims/productcolors', newColor)
      .subscribe((data) => {
        console.log(data);
        if (data['success'] === true) {
          alert('Product Color Updated Successfully!!!');
          this.productTypeForm.reset();
        } else {
          alert(data['message']);
          this.productTypeForm.reset();
        }
      });
    } else {
      newColor = {
        'productColorName': this.productColorForm.value['productColorName'],
        'remarks': this.productColorForm.value['remarks'],
      };
      this.http
        .post('http://192.1.200.123:8080/ims/productcolors', newColor)
        .subscribe((data) => {
          console.log(data);
          if (data['success'] === true) {
            alert('Product Color Added Successfully!!!');
            this.productTypeForm.reset();
          } else {
            alert(data['message']);
            this.productTypeForm.reset();
          }
        });
    }
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
        .put(AppModule.apiLink + 'productSizeTypes', newSize)
        .subscribe((data) => {
          console.log(data);
          if (data['success'] === true) {
            alert('Product Size Type Updated Successfully!!!');
            this.productTypeForm.reset();
          } else {
            alert(data['message']);
            this.productTypeForm.reset();
          }
        });
    } else {
      newSize = {
        'productSizeType': this.productSizeTypeForm.value['productSizeType'],
        'productSizes': this.productSizeTypeForm.value['productSizes'],
        'remarks': this.productSizeTypeForm.value['remarks'],
      };
      this.http
        .post(AppModule.apiLink + 'productSizeTypes', newSize)
        .subscribe((data) => {
          console.log(data);
          if (data['success'] === true) {
            alert('Product Size Type Added Successfully!!!');
            this.productTypeForm.reset();
          } else {
            alert(data['message']);
            this.productTypeForm.reset();
          }
        });
    }
  }

  onEditType(productTypeId: number) {
    this.router.navigate(['./'], {
      queryParams: { isEditing: 'true', id: productTypeId, edit: 'type' },
      relativeTo: this.route,
    });
  }
  onDeleteType(productTypeId: number) {
    this.http.delete(AppModule.apiLink+"productTypes/"+productTypeId).subscribe(
      data =>{
        console.log(data);
        if (data['success'] === true) {
          alert('Product Type Deleted Successfully!!!');
          this.productTypeForm.reset();
        } else {
          alert(data['message']);
          this.productTypeForm.reset();
        }
      }
    );
  }

  onEditColor(productColorId: number) {
    this.router.navigate(['./'], {
      queryParams: { isEditing: 'true', id: productColorId, edit: 'color' },
      relativeTo: this.route,
    });
  }
  onDeleteColor(productColorId: number) {
    this.http.delete(AppModule.apiLink+"productcolors/"+productColorId).subscribe(
      data =>{
        console.log(data);
        if (data['success'] === true) {
          alert('Product Color Deleted Successfully!!!');
          this.productTypeForm.reset();
        } else {
          alert(data['message']);
          this.productTypeForm.reset();
        }
      }
    );
  }

  onEditSize(productSizeId: number) {
    this.router.navigate(['./'], {
      queryParams: { isEditing: 'true', id: productSizeId, edit: 'size' },
      relativeTo: this.route,
    });
  }
  onDeleteSize(productSizeId: number) {
    this.http.delete(AppModule.apiLink+"productSizeTypes/"+productSizeId).subscribe(
      data =>{
        console.log(data);
        if (data['success'] === true) {
          alert('Product Size Type Deleted Successfully!!!');
          this.productTypeForm.reset();
        } else {
          alert(data['message']);
          this.productTypeForm.reset();
        }
      }
    );
  }

  onCancel() {
    this.isEditing = false;
    this.productTypeForm.reset();
    this.router.navigate(['./'], { relativeTo: this.route });
  }
}
