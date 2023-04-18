import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from 'src/app/app.module';

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

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

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
      // console.log(this.citiesObj);
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
      // console.log(this.statesObj);
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
          // console.log(data);
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
          // console.log(data);
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
