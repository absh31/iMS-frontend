import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-home',
  templateUrl: './order-home.component.html',
  styleUrls: ['./order-home.component.css']
})
export class OrderHomeComponent {
  productsData : any;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  addOrder(){
    this.router.navigate(['add'], {relativeTo: this.route});
  }

}
