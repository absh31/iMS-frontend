import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var $;
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

  constructor(private http: HttpClient, private router : Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
    };
    this.getMerchants();
  }

  getMerchants() {
    this.http.get('http://localhost:8080/ims/merchants').subscribe((data) => {
      this.merchants = data;
      // console.log(this.merchants);

      //   this.dtOptions = {
      //     data: this.merchants,
      //     columns: [
      //       { title: 'ID', data: 'merchantId' },
      //       // {title: 'Email', data: 'email'},
      //       { title: 'Name', data: 'merchantName' },
      //       {
      //         title: 'Edit',
      //         data: 'merchantId',
      //         render: function (data) {
      //           // console.log(data);

      //           return (
      //             "<button (click)=editMerchant("+data+") class='btn btn-primary btn-sm'>Edit</button>"
      //           );
      //         },
      //       },
      //     ],
      //   };
      // },
      // (err) => {},
      // () => {
      //   this.dataTable = $(this.table.nativeElement);
      //   this.dataTable.DataTable(this.dtOptions);
    });
  }

  showMerchantDetails(merchantId: number) {
    console.log(merchantId);
  }

  editMerchant(merchantId: number) {
    this.router.navigate(['./edit/'+merchantId], {relativeTo: this.route});
    console.log(merchantId);
  }

  deleteMerchant(merchantId: number) {
    console.log(merchantId);
    this.http
      .delete('http://localhost:8080/ims/merchants/' + merchantId)
      .subscribe((data) => {
        alert('Merchant deleted Successfully!');
        console.log(data);
      });
  }
}
