import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { ToastrServices } from 'src/app/services/toastr.services';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  dataFetched = false;
  id: number;
  productDetails: any;
  productCombos: any;
  colors: any;
  sizes: any;
  colorObj = {};
  sizesObj = {};
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastr: ToastrServices
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.getProductDetails(this.id)
        .then(() => this.getProductComboDetails(this.id))
        .then(() => this.getproductColors())
        .then(() => this.getproductSizes())
        .then(() => this.getColorObj())
        .then(() => this.getSizeObj())
        .then(() => {
          this.dataFetched = true;
        })
        .catch((error) => {
          console.log(error);
          this.toastr.error('Something went wrong');
        });
    });
  }

  getProductDetails(id: number) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'products/'.concat(id.toString()))
        .subscribe(
          (data) => {
            this.dataFetched = false;
            this.productDetails = data;
            resolve(data);
          },
          (error) => {
            reject(error);
          }
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
            this.dataFetched = false;
            this.productCombos = data;
            this.dataFetched = true;
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
    return promise;
  }

  getproductColors() {
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

  getproductSizes() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'productSizes').subscribe(
        (data) => {
          this.sizes = data;
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
        this.colorObj[color['productColorId']] = color['productColorName'];
      });
      resolve(this.colorObj);
    });
    return promise;
  }

  getSizeObj() {
    const promise = new Promise((resolve, reject) => {
      this.sizes.forEach((size) => {
        this.sizesObj[size['productSizeId']] = size['productSize'];
      });
      resolve(this.sizesObj);
    });
    return promise;
  }
}
