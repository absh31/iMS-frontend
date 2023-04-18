import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  dataFetched: boolean = false;
  productsData: any;
  productTypes: any;
  productObj = {};
  typeObj = {};

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.fetchProducts()
      .then(() => this.getProductObj())
      .then(() => this.getProductTypes())
      .then(() => this.getTypeObj())
      .catch(() => {
        console.log(error);
        this.toastr.error("Something went wrong")
      });
  }

  fetchProducts() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'products').subscribe(
        (data) => {
          this.productsData = data;
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
    return promise;
  }

  getProductObj() {
    this.productsData.forEach((product) => {
      this.productObj[product['productId']] = product;
    });
  }

  getProductTypes() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'productTypes').subscribe(
        (data) => {
          this.productTypes = data;
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
    return promise;
  }

  getTypeObj() {
    const promise = new Promise((resolve, reject) => {
      this.productTypes.forEach((type) => {
        this.typeObj[type['productTypeId']] = type['productType'];
      });
      resolve(this.typeObj);
    });
    return promise;
  }

  updateProduct(productId: number) {
    this.router.navigate(['./edit/' + productId], { relativeTo: this.route });
  }

  onDeleteProduct(productId: number) {
    if (this.checkProduct(productId)) {
      this.deleteProduct(productId);
    } else {
      this.toastr.warning("Can't Delete this Product! It has sub-Products.");
    }
  }

  checkProduct(productId: number): boolean {
    if (
      this.productObj[productId]['lastSold'] === null &&
      this.productObj[productId]['lastPurchased'] === null
    ) {
      return true;
    } else {
      return false;
    }
  }

  deleteProduct(productId: number) {
    const promise = new Promise((resolve, reject) => {
      this.http.delete(AppModule.apiLink + 'products/' + productId).subscribe(
        (data) => {
          if (data['success'] === true) {
            this.toastr.success("Product deleted successfully");
            resolve(data);
          }
        },
        (error) => reject(error)
      );
    });
    return promise;
  }
}
