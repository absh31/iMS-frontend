import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { resolve } from 'chart.js/dist/helpers/helpers.options';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { AppModule } from 'src/app/app.module';
import { DbSaveService } from 'src/app/db-save.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css'],
})
export class OrderAddComponent implements OnInit {
  productTypeSelected: boolean = false;
  productSelected: boolean = false;
  orderForm: FormGroup;
  orderFormData: any;
  orderItems = [];
  orderTypes: any;
  orderTypeObj = {};
  currentOrderTypeId: any;
  dispatchRequired: boolean = true;
  merchants: any;
  productTypes: any;
  products: any;
  productObj = {};
  productCombos: any;
  currentProductCombo: any;
  colors: any;
  sizes: any;
  colorObj = {};
  sizeObj = {};
  orderId: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private dbSave: DbSaveService
  ) {}

  ngOnInit(): void {
    this.getOrderTypes()
      .then(() => this.getOrderTypeObj())
      .then(() => this.getMerchants())
      .then(() => this.getProductTypes())
      .then(() => this.getColors())
      .then(() => this.getColorObj())
      .then(() => this.getSizes())
      .then(() => this.getSizeObj())
      .then(() => this.initForm())
      .catch((error) => console.log(error));
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

  getOrderTypeObj() {
    const promise = new Promise((resolve, reject) => {
      this.orderTypes.forEach((orderType) => {
        this.orderTypeObj[orderType.orderTypeId] = orderType.logType;
        resolve(this.orderTypeObj);
      });
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
        this.colorObj[color.productColorId] = color.productColorName;
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
        this.sizeObj[size.productSizeId] = size.productSize;
      });
      resolve(this.sizeObj);
    });
    return promise;
  }

  getProductTypes() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'productTypes').subscribe(
        (data) => {
          this.productTypes = data;
          resolve(this.productTypes);
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  getProducts(productTypeId: string) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'products/productType/' + productTypeId)
        .subscribe(
          (data) => {
            this.products = data;
            resolve(this.products);
          },
          (error) => reject(error)
        );
    });
    return promise;
  }

  getProductCombos(productId: string) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'productCombos/product/' + productId)
        .subscribe(
          (data) => {
            this.productCombos = data;
            resolve(this.productCombos);
          },
          (error) => reject(error)
        );
    });
    return promise;
  }

  getCurrentProductCombo(productComboId: string) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'productCombos/' + productComboId)
        .subscribe(
          (data) => {
            this.currentProductCombo = data;
            resolve(this.currentProductCombo);
          },
          (error) => reject(error)
        );
    });
    return promise;
  }

  initForm() {
    const promise = new Promise((resolve, reject) => {
      let orderTypeId = '';
      let orderMerchantId = '';
      let orderDateTime = '';
      let orderDispatch = false;
      let orderDiscount = '';
      let remarks = '';
      this.orderForm = new FormGroup({
        orderTypeId: new FormControl(orderTypeId),
        orderMerchantId: new FormControl(orderMerchantId),
        orderDateTime: new FormControl(orderDateTime),
        orderDispatch: new FormControl(orderDispatch),
        orderAmount: new FormControl({ value: null, disabled: true }),
        orderTotal: new FormControl({ value: null, disabled: true }),
        orderDiscount: new FormControl(orderDiscount),
        orderQuantity: new FormControl({ value: null, disabled: true }),
        remarks: new FormControl(remarks),
        productType: new FormControl(null),
        product: new FormControl(null),
        productItem: new FormControl(null),
        productCombos: new FormArray([]),
        productInventory: new FormArray([]),
      });
      resolve(this.orderForm);
    });
    return promise;
  }

  onChangeProductType() {
    let productType = (<HTMLInputElement>document.getElementById('productType'))
      .value;
    this.getProducts(productType)
      .then(() => {
        this.products.forEach((product) => {
          this.productObj[product['productId']] = product['productDesc'];
        });
        this.productTypeSelected = true;
      })
      .catch((error) => console.log(error));
  }

  onChangeProduct() {
    let product = (<HTMLInputElement>document.getElementById('product')).value;
    this.getProductCombos(product)
      .then(() => {
        this.productSelected = true;
      })
      .catch((error) => console.log(error));
  }

  onChangeOrderType() {
    this.currentOrderTypeId = (<HTMLInputElement>(
      document.getElementById('orderTypeId')
    )).value;
    if (this.orderTypeObj[this.currentOrderTypeId] == 'IN') {
      this.dispatchRequired = false;
    } else {
      this.dispatchRequired = true;
    }
  }

  onAddItem() {
    let productCombo = (<HTMLInputElement>(
      document.getElementById('productItem')
    )).value;
    if (productCombo) {
      this.getCurrentProductCombo(productCombo)
        .then((data) => {
          this.addItem(data, productCombo);
        })
        .then(() => {
          this.resetProducts();
        })
        .catch((error) => console.log(error));
    } else {
      this.toastr.warning('Please Select an Item!!!');
    }
  }

  addItem(data: any, productComboId: string) {
    let displayText =
      this.productObj[data['productId']] +
      '-' +
      this.sizeObj[data['productSize']] +
      '-' +
      this.colorObj[data['productColor']];
    (<FormArray>this.orderForm.get('productInventory')).push(
      new FormGroup({
        productCombo: new FormControl({ value: displayText, disabled: true }),
        productComboId: new FormControl(productComboId),
        productPrice: new FormControl(null),
        productGST: new FormControl(null),
        productComboQuantity: new FormControl(null),
      })
    );
  }

  onSaveOrder(dispatch: boolean) {
    this.onRefresh()
      .then(() => this.dbSave.saveCheckPoint())
      .then(() => this.getOrderFormData(dispatch))
      .then(() => this.saveOrder())
      .then(() => this.getOrderItems())
      .then(() => this.saveOrderItems())
      .then(() => this.dbSave.commitChanges())
      .then((data) => {
        this.toastr.success('Order Saved Successfully!!!');
        this.orderForm.reset();
        this.router.navigate(['../'], { relativeTo: this.route });
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
        this.dbSave.rollbackToCheckPoint();
      });
  }

  getOrderFormData(dispatch: boolean) {
    const promise = new Promise((resolve, reject) => {
      let orderTypeId = this.orderForm.value['orderTypeId'];
      let orderMerchantId = this.orderForm.value['orderMerchantId'];
      let orderDateTime = this.orderForm.value['orderDateTime'];
      let orderDispatch = dispatch;
      let orderAmount = this.orderForm.value['orderAmount'];
      let orderTotal = this.orderForm.value['orderTotal'];
      let orderDiscount = this.orderForm.value['orderDiscount'];
      let orderQuantity = this.orderForm.value['orderQuantity'];
      let remarks = this.orderForm.value['remarks'];
      this.orderFormData = {
        orderTypeId: orderTypeId,
        orderMerchantId: orderMerchantId,
        orderDateTime: orderDateTime,
        orderDispatch: orderDispatch,
        orderAmount: orderAmount,
        orderTotal: orderTotal,
        orderDiscount: orderDiscount,
        orderQuantity: orderQuantity,
        remarks: remarks,
      };
      console.log(this.orderFormData);
      resolve(this.orderFormData);
    });
    return promise;
  }

  getOrderItems() {
    let items = this.orderForm.value['productInventory'];
    const promise = new Promise((resolve, reject) => {
      items.forEach((item) => {
        item['orderId'] = this.orderId;
        item['logType'] =
          this.orderTypeObj[this.orderForm.value['orderTypeId']];
        this.orderItems.push(item);
      });
      resolve(this.orderItems);
    });
    return promise;
  }

  saveOrder() {
    const promise = new Promise((resolve, reject) => {
      this.http
        .post(AppModule.apiLink + 'orders', this.orderFormData)
        .subscribe(
          (data) => {
            this.orderId = data['timestamp'];
            resolve(data);
          },
          (error) => reject(error)
        );
    });
    return promise;
  }

  saveOrderItems() {
    const promise = new Promise((resolve, reject) => {
      this.http
        .post(AppModule.apiLink + 'productLogs/many', this.orderItems)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => reject(error)
        );
    });
    return promise;
  }

  resetProducts() {
    (<HTMLInputElement>document.getElementById('productType')).value = '';
    (<HTMLInputElement>document.getElementById('product')).value = '';
    (<HTMLInputElement>document.getElementById('productItem')).value = '';
  }

  onRefresh() {
    const promise = new Promise((resolve, reject) => {
      let items = this.orderForm.value['productInventory'];
      let quantity = 0;
      let amount = 0;
      let total = 0;
      let tax = 0;
      let discount = this.orderForm.value['orderDiscount'];
      items.forEach((item) => {
        quantity += +item['productComboQuantity'];
        if (item['productPrice']) {
          amount +=
            +item['productComboQuantity'] *
            (item['productPrice'] - (+item['productPrice'] * +discount) / 100);
          tax +=
            +item['productComboQuantity'] *
            (item['productPrice'] - (+item['productPrice'] * +discount) / 100) *
            (+item['productGST'] / 100);
        }
      });
      total = amount + tax;

      this.orderForm.value['orderQuantity'] = quantity;
      (<HTMLInputElement>document.getElementById('orderQuantity')).value =
        quantity.toString();
      this.orderForm.value['orderAmount'] = amount;
      (<HTMLInputElement>document.getElementById('orderAmount')).value =
        amount.toString();
      this.orderForm.value['orderTotal'] = total;
      (<HTMLInputElement>document.getElementById('orderTotal')).value =
        total.toString();

      resolve(null);
    });
    return promise;
  }

  onRemoveItem(index: number) {
    (<FormArray>this.orderForm.get('productInventory')).removeAt(index);
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
