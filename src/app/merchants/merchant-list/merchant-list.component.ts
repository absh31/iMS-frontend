import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppModule } from 'src/app/app.module';
@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css'],
})
export class MerchantListComponent {
  merchants: any;
  dtOptions: any;
  dataTable: any;
  tableData = [];
  @ViewChild('dataTable', { static: true }) table;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
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

  deleteMerchant(merchantId: number) {
    this.http
      .delete(AppModule.apiLink + 'merchants/' + merchantId)
      .subscribe((data) => {
        this.toastr.success('Merchant deleted Successfully!');
      });
  }
}
