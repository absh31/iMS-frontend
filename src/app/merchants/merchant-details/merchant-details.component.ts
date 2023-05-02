import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toast } from 'ngx-toastr';
import { AppModule } from 'src/app/app.module';
import { ToastrServices } from 'src/app/services/toastr.services';

@Component({
  selector: 'app-merchant-details',
  templateUrl: './merchant-details.component.html',
  styleUrls: ['./merchant-details.component.css'],
})
export class MerchantDetailsComponent implements OnInit {
  dataFetched: boolean;
  id: number;
  merchantDetails: any;
  stateDetails: any;
  cityDetails: any;
  statesObj = {};
  citiesObj = {};

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastr: ToastrServices
  ) {}

  ngOnInit(): void {
    this.getCityDetails()
      .then(() => this.getStateDetails())
      .then(() => this.getCityObj())
      .then(() => this.getStateObj())
      .then(() => {
        this.route.params.subscribe((params) => {
          this.id = params.id;
          this.getMerchantDetails(this.id).then(() => {
            this.dataFetched = true;
          });
        });
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
      });
  }

  flushData() {
    this.dataFetched = false;
    this.merchantDetails = {};
  }

  getCityObj() {
    const promise = new Promise((resolve, reject) => {
      this.cityDetails.forEach((city) => {
        this.citiesObj[city['cityId']] = city['cityName'];
      });
      resolve(this.citiesObj);
      return promise;
    });
  }

  getStateObj() {
    const promise = new Promise((resolve, reject) => {
      this.stateDetails.forEach((state) => {
        this.statesObj[state['stateId']] = state['stateName'];
      });
      resolve(this.statesObj);
      return promise;
    });
  }

  getMerchantDetails(id: number) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'merchants/'.concat(id.toString()))
        .subscribe(
          (data) => {
            this.flushData();
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

  getCityDetails() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'cities').subscribe(
        (data) => {
          this.cityDetails = data;
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
    return promise;
  }

  getStateDetails() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'states').subscribe(
        (data) => {
          this.stateDetails = data;
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
