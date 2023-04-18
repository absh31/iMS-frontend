import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent {

  productsData : any;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  addProduct(){
    this.router.navigate(['add'], {relativeTo: this.route});
  }

}
