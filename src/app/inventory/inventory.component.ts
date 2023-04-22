import { Component, OnInit } from '@angular/core';
import { AppModule } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  orderTypes: any;
  merchants: any;
  merchantObj = {};
  products: any;
  productObj = {};
  productCombos: any;
  colors: any;
  sizes: any;
  colorObj = {};
  sizeObj = {};

  selectedOrderType: string = 'All';
  selectedMerchant: string = 'All';
  selectedProduct: string = 'All';
  selectedDispatch: string = 'All';

  constructor(private http: HttpClient, private toastr: ToastrService) {}
  ngOnInit() {
    this.getOrderTypes()
      .then(() => this.getMerchants())
      .then(() => this.getMerchantObj())
      .then(() => this.getProducts())
      .then(() => this.getProductObj())
      .then(() => this.getProductCombos())
      .then(() => this.getColors())
      .then(() => this.getColorObj())
      .then(() => this.getSizes())
      .then(() => this.getSizeObj())
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
      });
  }

  getOrderTypes() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'orderTypes').subscribe(
        (data) => {
          this.orderTypes = data;
          resolve(this.orderTypes);
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  getMerchants() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'merchants').subscribe(
        (data) => {
          this.merchants = data;
          resolve(this.merchants);
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  getMerchantObj() {
    const promise = new Promise((resolve, reject) => {
      this.merchants.forEach((merchant) => {
        this.merchantObj[merchant['merchantId']] = merchant['merchantName'];
      });
      resolve(this.merchantObj);
    });
    return promise;
  }

  getProducts() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'products').subscribe(
        (data) => {
          this.products = data;
          resolve(this.products);
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  getProductObj() {
    const promise = new Promise((resolve, reject) => {
      this.products.forEach((product) => {
        this.productObj[product['productId']] = product['productDesc'];
      });
      resolve(this.productObj);
    });
    return promise;
  }

  getProductCombos() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'productCombos').subscribe(
        (data) => {
          this.productCombos = data;
          resolve(this.productCombos);
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  getColors() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'productcolors').subscribe(
        (data) => {
          this.colors = data;
          resolve(this.colors);
        },
        (error) => reject(error)
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

  getSizes() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'productSizes').subscribe(
        (data) => {
          this.sizes = data;
          resolve(this.sizes);
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  getSizeObj() {
    const promise = new Promise((resolve, reject) => {
      this.sizes.forEach((size) => {
        this.sizeObj[size['productSizeId']] = size['productSize'];
      });
      resolve(this.sizeObj);
    });
    return promise;
  }

  onChange() {}
}
