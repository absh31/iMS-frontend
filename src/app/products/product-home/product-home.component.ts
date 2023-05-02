import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AES, enc } from 'crypto-ts';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css'],
})
export class ProductHomeComponent implements OnInit {
  dataFetched: boolean = false;
  productsData: any;

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
    this.getProductData()
      .then(() => {
        this.dataFetched = true;
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
      });
  }

  addProduct() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  getProductData() {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'utility/products', {
          headers: { ip: this.sessionIP },
        })
        .subscribe(
          (data) => {
            this.productsData = data;
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
