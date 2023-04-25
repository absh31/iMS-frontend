import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppModule } from 'src/app/app.module';
import { DbSaveService } from 'src/app/db-save.service';
@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css'],
})
export class MerchantListComponent {
  merchants: any;
  dtOptions : DataTables.Settings = {};
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dbSave: DbSaveService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType : 'full_numbers',
      pageLength : 10,
      processing : true
    };
    this.getMerchants();
  }

  getMerchants() {
    this.http.get(AppModule.apiLink + 'merchants').subscribe((data) => {
      this.merchants = data;
    });
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
}
