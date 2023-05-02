import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AES, enc } from 'crypto-ts';
import { AppModule } from 'src/app/app.module';
import { ToastrServices } from 'src/app/services/toastr.services';

@Component({
  selector: 'app-merchant-home',
  templateUrl: './merchant-home.component.html',
  styleUrls: ['./merchant-home.component.css'],
})
export class MerchantHomeComponent implements OnInit {
  merchantsData: any;
  dataFetched: boolean = false;
  sessionDetails = AES.decrypt(
    sessionStorage.getItem('loginDetails'),
    'absh'
  ).toString(enc.Utf8);
  sessionDetailsJSON = JSON.parse(this.sessionDetails);
  sessionIP = this.sessionDetailsJSON['IP'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrServices
  ) {}

  ngOnInit(): void {
    this.getMerchantData()
      .then(() => {
        this.dataFetched = true;
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong!');
      });
  }

  addMerchant() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  getMerchantData() {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'utility/merchant', {
          headers: { ip: this.sessionIP },
        })
        .subscribe(
          (data) => {
            console.log(data);
            
            this.merchantsData = data;
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
