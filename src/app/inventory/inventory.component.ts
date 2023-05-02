import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppModule } from '../app.module';
import { ToastrServices } from '../services/toastr.services';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  orderTypes: any;
  orders: any;
  orderObj = {};
  merchants: any;
  merchantObj = {};
  products: any;
  productObj = {};
  productCombos: any;
  productComboObj = {};
  colors: any;
  sizes: any;
  colorObj = {};
  sizeObj = {};
  logs: any;

  constructor(private http: HttpClient, private toastr: ToastrServices) {}
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'numbers',
      pageLength: 10,
      processing: true,
    };
    this.getOrderTypes()
      .then(() => this.getMerchants())
      .then(() => this.getMerchantObj())
      .then(() => this.getOrders())
      .then(() => this.getOrderObj())
      .then(() => this.getProducts())
      .then(() => this.getProductObj())
      .then(() => this.getProductCombos())
      .then(() => this.getProductComboObj())
      .then(() => this.getColors())
      .then(() => this.getColorObj())
      .then(() => this.getSizes())
      .then(() => this.getSizeObj())
      .then(() => this.getLogs('ALL', 'ALL'))
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
      });
  }

  getLogs(logType: string, dispatched: string) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(
          AppModule.apiLink +
            'productLogs/params?logType=' +
            logType +
            '&dispatch=' +
            dispatched
        )
        .subscribe(
          (data) => {
            this.logs = data;
            console.log(data);
            resolve(this.logs);
          },
          (error) => {
            console.log(error);
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

  getOrders() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'orders').subscribe(
        (data) => {
          this.orders = data;
          resolve(this.orders);
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  getOrderObj() {
    const promise = new Promise((resolve, reject) => {
      this.orders.forEach((order) => {
        this.orderObj[order['orderId']] = order['orderMerchantId'];
      });
      resolve(this.orderObj);
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

  getProductComboObj() {
    const promise = new Promise((resolve, reject) => {
      this.productCombos.forEach((productCombo) => {
        this.productComboObj[productCombo['productComboId']] =
          productCombo['productId'];
      });
      resolve(this.colorObj);
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

  onChange() {
    let logType = (<HTMLInputElement>document.getElementById('logType')).value;
    let dispatch = (<HTMLInputElement>document.getElementById('dispatch'))
      .value;
    this.getLogs(logType, dispatch).catch((error) => {
      console.log(error);
      this.toastr.error('Something went wrong!');
    });
  }
}
