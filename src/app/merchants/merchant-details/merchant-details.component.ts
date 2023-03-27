import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-merchant-details',
  templateUrl: './merchant-details.component.html',
  styleUrls: ['./merchant-details.component.css']
})
export class MerchantDetailsComponent implements OnInit{

  dataFetched = false;
  id : number;
  merchantDetails : any;
  constructor(private http: HttpClient, private route : ActivatedRoute){
  }

  ngOnInit(): void {
    
    this.route.params.subscribe(
      params =>{
        this.id = params.id;
        this.getMerchantDetails(this.id);
    });
    
  }

  getMerchantDetails(id: number) {
    this.http.get('http://localhost:8080/ims/merchants/'.concat(id.toString()),).subscribe(
      (data) => {
        this.dataFetched = false;
        this.merchantDetails = data;
        this.dataFetched = true;
        console.log(data);
        
      }
    )
  }
}
