import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { AES, enc } from 'crypto-ts';
import { AppModule } from '../app.module';
import { AuthService } from '../services/auth.service';
import { ToastrServices } from '../services/toastr.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dataFetched: boolean = false;
  public chart: any;
  public chart1: any;
  sales = {};
  inventory = {};
  purchase = {};
  product = {};
  charts: any;
  sessionDetails = AES.decrypt(
    sessionStorage.getItem('loginDetails'),
    'absh'
  ).toString(enc.Utf8);
  sessionDetailsJSON = JSON.parse(this.sessionDetails);
  sessionIP = this.sessionDetailsJSON['IP'];

  constructor(
    private http: HttpClient,
    private toastr: ToastrServices,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getSalesData()
      .then(() => this.getPurchaseData())
      .then(() => this.getInventoryData())
      .then(() => this.getProductData())
      .then(() => this.getChartsData())
      .then(() => {
        this.createCharts();
        this.dataFetched = true;
      })
      .catch((error) => {
        this.toastr.error('Something went wrong');
        console.log(error);
      });
  }

  getSalesData() {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'utility/sales', {
          headers: { ip: this.sessionIP },
        })
        .subscribe(
          (data) => {
            this.sales = data;
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
    return promise;
  }

  getPurchaseData() {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'utility/purchase', {
          headers: { ip: this.sessionIP },
        })
        .subscribe(
          (data) => {
            this.purchase = data;
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
    return promise;
  }

  getInventoryData() {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'utility/inventory', {
          headers: { ip: this.sessionIP },
        })
        .subscribe(
          (data) => {
            this.inventory = data;
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
    return promise;
  }

  getProductData() {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'utility/product', {
          headers: { ip: this.sessionIP },
        })
        .subscribe(
          (data) => {
            this.product = data;
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
    return promise;
  }

  getChartsData() {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'utility/charts', {
          headers: { ip: this.sessionIP },
        })
        .subscribe(
          (data) => {
            this.charts = data;
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
    return promise;
  }

  createCharts() {
    this.chart = new Chart('LineQty', {
      type: 'line',
      data: {
        labels: this.charts['dates'],
        datasets: [
          {
            label: 'Sales',
            data: this.charts['sales'],
            backgroundColor: 'green',
          },
          {
            label: 'Purchase',
            data: this.charts['purchase'],
            backgroundColor: 'red',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
    this.chart1 = new Chart('LineCount', {
      type: 'line',
      data: {
        labels: this.charts['dates'],
        datasets: [
          {
            label: 'Sales',
            data: this.charts['salesQty'],
            backgroundColor: 'green',
          },
          {
            label: 'Purchase',
            data: this.charts['purchaseQty'],
            backgroundColor: 'red',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
