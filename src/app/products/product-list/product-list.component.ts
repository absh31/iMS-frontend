import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  productDetails: any;
  productCombos: any;
  colors: any;
  sizes: any;
  colorObj = {};
  sizesObj = {};
  deadCountForm: FormGroup;
  dtOptions: DataTables.Settings = {};

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'numbers',
      pageLength: 10,
      processing: true,
    };
    this.getProducts()
      .then(() => this.getProductObj())
      .then(() => this.getProductTypes())
      .then(() => this.getTypeObj())
      .then(() => this.getproductColors())
      .then(() => this.getproductSizes())
      .then(() => this.getColorObj())
      .then(() => this.getSizeObj())
      .then(() => this.initForm())
      .catch(() => {
        console.log(error);
        this.toastr.error('Something went wrong');
      });
  }

  getProducts() {
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
            this.toastr.success('Product deleted successfully');
            resolve(data);
          }
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  getProductDetails(id: number) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'products/'.concat(id.toString()))
        .subscribe(
          (data) => {
            this.dataFetched = false;
            this.productDetails = data;
            resolve(data);
          },
          (error) => {
            this.toastr.error('Something went wrong');
            reject(error);
          }
        );
    });
    return promise;
  }

  getProductComboDetails(id: number) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(AppModule.apiLink + 'productCombos/product/'.concat(id.toString()))
        .subscribe(
          (data) => {
            this.dataFetched = false;
            this.productCombos = data;
            this.dataFetched = true;
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
    return promise;
  }

  getproductColors() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'productcolors').subscribe(
        (data) => {
          this.colors = data;
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
    return promise;
  }

  getproductSizes() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'productSizes').subscribe(
        (data) => {
          this.sizes = data;
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
    return promise;
  }

  getColorObj() {
    const promise = new Promise((resolve, reject) => {
      this.colors.forEach((color) => {
        this.colorObj[color['productColorId']] = color['productColorName'];
      });
      resolve(this.colorObj);
    });
    return promise;
  }

  getSizeObj() {
    const promise = new Promise((resolve, reject) => {
      this.sizes.forEach((size) => {
        this.sizesObj[size['productSizeId']] = size['productSize'];
      });
      resolve(this.sizesObj);
    });
    return promise;
  }

  openDetails(id: number, content: any) {
    this.getProductDetails(id)
      .then(() => this.getProductComboDetails(id))
      .then(() => {
        this.modalService.open(content, { size: 'xl', scrollable: true });
      });
  }

  initForm() {
    const promise = new Promise((resolve, reject) => {
      let deadCount = 0;
      this.deadCountForm = new FormGroup({
        count: new FormControl(deadCount),
      });
      resolve(this.deadCountForm);
    });
    return promise;
  }

  onSaveDeadCount(productComboId: number, productQuantity: number, deadCount: number) {
    let dCount = +(<HTMLInputElement>(
      document.getElementById('dCount' + productComboId)
    )).value;
    if (dCount > productQuantity || dCount <= 0) {
      this.toastr.error('Enter valid Quantity');
    } else {
      this.saveDeadCount(productComboId, dCount)
        .then(() => {
          this.toastr.success('Saved Successfully!');
        })
        .catch((error) => {
          console.log(error);
          this.toastr.error('Something went wrong');
        });
    }
  }

  saveDeadCount(productComboId: number, dCount: number) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .put(
          AppModule.apiLink +
            'productCombos/dead?productComboId=' +
            productComboId +
            '&dCount=' +
            dCount,
          {
            productComboId: productComboId,
            dCount: dCount,
          }
        )
        .subscribe(
          (data) => {
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
