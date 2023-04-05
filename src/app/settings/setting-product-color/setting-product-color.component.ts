import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-setting-product-color',
  templateUrl: './setting-product-color.component.html',
  styleUrls: ['./setting-product-color.component.css'],
})
export class SettingProductColorComponent {
  productColorForm: FormGroup;
  id: number;
  isEditing: boolean;
  editMode: string;
  colorDetails: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.get(AppModule.apiLink + 'productcolors').subscribe((data) => {
      console.log(data);
      this.colorDetails = data;
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
    let productColor = '';
    let colorRemarks = '';
    if (this.isEditing) {
      switch (this.editMode) {
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
        default: {
          this.isEditing = false;
        }
      }
    }
    setTimeout(() => {
      this.productColorForm = new FormGroup({
        productColorName: new FormControl(productColor),
        remarks: new FormControl(colorRemarks),
      });
    }, 500);
  }

  
  onSubmitColor() {
    let newColor;
    if (this.isEditing) {
      newColor = {
        productColorId: this.id,
        productColorName: this.productColorForm.value['productColorName'],
        remarks: this.productColorForm.value['remarks'],
      };
      this.http
        .put(AppModule.apiLink+'productcolors', newColor)
        .subscribe((data) => {
          console.log(data);
          if (data['success'] === true) {
            alert('Product Color Updated Successfully!!!');
            this.productColorForm.reset();
          } else {
            alert(data['message']);
            this.productColorForm.reset();
          }
        });
    } else {
      newColor = {
        productColorName: this.productColorForm.value['productColorName'],
        remarks: this.productColorForm.value['remarks'],
      };
      this.http
        .post(AppModule.apiLink+'productcolors', newColor)
        .subscribe((data) => {
          console.log(data);
          if (data['success'] === true) {
            alert('Product Color Added Successfully!!!');
            this.productColorForm.reset();
          } else {
            alert(data['message']);
            this.productColorForm.reset();
          }
        });
    }
  }

  onEditColor(productColorId: number) {
    this.router.navigate(['./'], {
      queryParams: { isEditing: 'true', id: productColorId, edit: 'color' },
      relativeTo: this.route,
    });
  }
  onDeleteColor(productColorId: number) {
    this.http
      .delete(AppModule.apiLink + 'productcolors' + productColorId)
      .subscribe((data) => {
        console.log(data);
        if (data['success'] === true) {
          alert('Product Color Deleted Successfully!!!');
          this.productColorForm.reset();
        } else {
          alert(data['message']);
          this.productColorForm.reset();
        }
      });
  }

  onCancel() {
    this.isEditing = false;
    this.productColorForm.reset();
    this.router.navigate(['./'], { relativeTo: this.route });
  }
}
