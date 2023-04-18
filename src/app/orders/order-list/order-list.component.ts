import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent {
  dataFetched: boolean = false;
  ordersData: any;
  merchantDetails: any;
  merchantObj = {};
  orderType: any;
  orderTypeObj = {};
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.fetchOrders()
      .then(() => this.getMerchants())
      .then(() => this.getMerchantObj())
      .then(() => this.getOrderTypes())
      .then(() => this.getOrderTypeObj())
      .then(() => (this.dataFetched = true))
      .catch(() => this.toastr.error("Something went wrong"));
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
          this.orderType = data;
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
      this.orderType.forEach((orderType) => {
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
          this.merchantDetails = data;
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
      this.merchantDetails.forEach((merchant) => {
        this.merchantObj[merchant['merchantId']] = merchant['merchantName'];
      });
      resolve(this.merchantObj);
    });
    return promise;
  }

  onEdit(orderId: number) {
    this.router.navigate(['./edit/' + orderId], { relativeTo: this.route });
  }
}
