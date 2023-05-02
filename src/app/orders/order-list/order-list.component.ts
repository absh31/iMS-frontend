import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppModule } from 'src/app/app.module';
import { ToastrServices } from 'src/app/services/toastr.services';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent {
  dtOptions: DataTables.Settings = {};
  dataFetched: boolean = false;
  ordersData: any;
  merchants: any;
  merchantObj = {};
  orderTypes: any;
  orderTypeObj = {};
  orderDetails: any;
  productInventory: any;
  productComboDetails: any;
  productDetails: any;
  productType: any;
  colors: any;
  sizes: any;
  productComboObj = {};
  productObj = {};
  productTypeObj = {};
  colorObj = {};
  sizesObj = {};

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrServices,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'numbers',
      pageLength: 10,
      processing: true,
    };
    this.fetchOrders()
      .then(() => this.getMerchants())
      .then(() => this.getMerchantObj())
      .then(() => this.getOrderTypes())
      .then(() => this.getOrderTypeObj())
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

      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
      });
  }

  fetchOrders() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'orders').subscribe(
        (data) => {
          this.ordersData = data;
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

  getOrderTypeObj() {
    const promise = new Promise((resolve, reject) => {
      this.orderTypes.forEach((orderType) => {
        this.orderTypeObj[orderType['orderTypeId']] = orderType['orderType'];
      });
      resolve(this.merchantObj);
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

  getMerchantObj() {
    const promise = new Promise((resolve, reject) => {
      this.merchants.forEach((merchant) => {
        this.merchantObj[merchant['merchantId']] = merchant['merchantName'];
      });
      resolve(this.merchantObj);
    });
    return promise;
  }

  onEdit(orderId: number) {
    this.router.navigate(['./edit/' + orderId], { relativeTo: this.route });
  }

  getOrderDetails(id: number) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'orders/'.concat(id.toString()))
        .subscribe(
          (data) => {
            this.orderDetails = data;
            resolve(data);
          },
          (error) => {
            console.log(error);
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
      resolve(this.merchantObj);
    });
    return promise;
  }

  openDetails(id: number, content: any) {
    this.getOrderDetails(id)
      .then(() => this.getProductInventoryDetails(id))
      .then(() => {
        this.modalService.open(content, { size: 'xl', scrollable: true });
      });
  }

  onDispatch(id: number) {
    this.dispatchOrder(id)
      .then(() => {
        this.toastr.success('Order has been dispatched successfully!');
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
      });
  }

  dispatchOrder(id: number) {
    const data = {
      orderId: id,
    };
    const promise = new Promise((resolve, reject) => {
      this.http.put(AppModule.apiLink + 'orders/dispatch', data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
    return promise;
  }
}
