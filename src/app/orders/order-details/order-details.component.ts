import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { ToastrServices } from 'src/app/services/toastr.services';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  dataFetched = false;
  id: number;
  orderDetails: any;
  productInventory: any;
  merchants: any;
  orderTypes: any;
  productComboDetails: any;
  productDetails: any;
  productType: any;
  colors: any;
  sizes: any;
  merchantObj = {};
  orderTypeObj = {};
  productComboObj = {};
  productObj = {};
  productTypeObj = {};
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
      this.getOrderDetails(this.id)
        .then(() => this.getProductInventoryDetails(this.id))
        .then(() => this.getOrderTypes())
        .then(() => this.getOrderTypeObj())
        .then(() => this.getMerchants())
        .then(() => this.getMerchantsObj())
        .then(() => this.getproductComboDetails())
        .then(() => this.getProductComboObj())
        .then(() => this.getproductDetails())
        .then(() => this.getProductObj())
        .then(() => this.getproductTypes())
        .then(() => this.getProductTypeObj())
        .then(() => this.getproductColors())
        .then(() => this.getColorObj())
        .then(() => this.getproductSizes())
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

  getOrderDetails(id: number) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'orders/'.concat(id.toString()))
        .subscribe(
          (data) => {
            this.dataFetched = false;
            this.orderDetails = data;
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
    return promise;
  }

  getProductInventoryDetails(id: number) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'productLogs/order/'.concat(id.toString()))
        .subscribe(
          (data) => {
            this.dataFetched = false;
            this.productInventory = data;
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
    return promise;
  }

  getproductComboDetails() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'productCombos').subscribe(
        (data) => {
          this.productComboDetails = data;
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
    return promise;
  }

  getproductDetails() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'products').subscribe(
        (data) => {
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

  getproductTypes() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'productTypes').subscribe(
        (data) => {
          this.productType = data;
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

  getMerchants() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'merchants').subscribe(
        (data) => {
          this.merchants = data;
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
    return promise;
  }

  getOrderTypes() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'orderTypes').subscribe(
        (data) => {
          this.orderTypes = data;
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
    return promise;
  }

  getProductComboObj() {
    const promise = new Promise((resolve, reject) => {
      this.productComboDetails.forEach((prodCombo) => {
        this.productComboObj[prodCombo['productComboId']] = prodCombo;
      });

      resolve(this.productComboObj);
    });
    return promise;
  }

  getProductObj() {
    const promise = new Promise((resolve, reject) => {
      this.productDetails.forEach((product) => {
        this.productObj[product['productId']] = product;
      });
      resolve(this.productObj);
    });
    return promise;
  }

  getProductTypeObj() {
    const promise = new Promise((resolve, reject) => {
      this.productType.forEach((productType) => {
        this.productTypeObj[productType['productTypeId']] =
          productType['productType'];
      });
      resolve(this.productTypeObj);
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

  getMerchantsObj() {
    const promise = new Promise((resolve, reject) => {
      this.merchants.forEach((merchant) => {
        this.merchantObj[merchant['merchantId']] = merchant['merchantName'];
      });
      resolve(this.colorObj);
    });
    return promise;
  }

  getOrderTypeObj() {
    const promise = new Promise((resolve, reject) => {
      this.orderTypes.forEach((orderType) => {
        this.orderTypeObj[orderType['orderTypeId']] = orderType['orderType'];
      });
      resolve(this.orderTypeObj);
    });
    return promise;
  }
}
