import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppModule } from 'src/app/app.module';
import { DbSaveService } from 'src/app/db-save.service';
@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css'],
})
export class MerchantListComponent {
  dataFetched: boolean = false;
  merchants: any;
  merchantDetails: any;
  stateDetails: any;
  cityDetails: any;
  statesObj = {};
  citiesObj = {};
  dtOptions: DataTables.Settings = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dbSave: DbSaveService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'numbers',
      pageLength: 10,
      processing: true,
    };
    this.getMerchants()
      .then(() => this.getCityDetails())
      .then(() => this.getStateDetails())
      .then(() => this.getCityObj())
      .then(() => this.getStateObj())
      .catch((error) => {
        console.log(error);
      });
  }

  getMerchants() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'merchants').subscribe(
        (data) => {
          this.merchants = data;
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

  editMerchant(merchantId: number) {
    this.router.navigate(['./edit/' + merchantId], { relativeTo: this.route });
  }

  onDeleteMerchant(merchantId: number) {
    this.dbSave
      .saveCheckPoint()
      .then(() => this.deleteMerchant(merchantId))
      .then(() => this.dbSave.commitChanges())
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went Wrong!');
        this.dbSave.rollbackToCheckPoint();
      });
  }

  deleteMerchant(merchantId: number) {
    this.http
      .delete(AppModule.apiLink + 'merchants/' + merchantId)
      .subscribe((data) => {
        this.toastr.success('Merchant deleted Successfully!');
      });
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

  flushData() {
    this.dataFetched = false;
    this.merchantDetails = {};
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

  openDetails(id: number, content: any) {
    this.getMerchantDetails(id).then(() => {
      this.modalService.open(content, { size: 'xl', scrollable: true })
    });
  }
}
