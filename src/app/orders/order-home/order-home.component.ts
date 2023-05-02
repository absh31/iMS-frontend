import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AES, enc } from 'crypto-ts';
import { ToastrService } from 'ngx-toastr';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-order-home',
  templateUrl: './order-home.component.html',
  styleUrls: ['./order-home.component.css'],
})
export class OrderHomeComponent implements OnInit {
  dataFetched: boolean = false;
  ordersData: any;
  sessionDetails = AES.decrypt(
    sessionStorage.getItem('loginDetails'),
    'absh'
  ).toString(enc.Utf8);
  sessionDetailsJSON = JSON.parse(this.sessionDetails);
  sessionIP = this.sessionDetailsJSON['IP'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getOrdersData()
      .then(() => {
        this.dataFetched = true;
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
      });
  }

  addOrder() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  getOrdersData() {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'utility/order', {
          headers: { ip: this.sessionIP },
        })
        .subscribe(
          (data) => {
            console.log(data);
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
}
