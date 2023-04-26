import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { InventoryComponent } from './inventory/inventory.component';
import { MerchantAddComponent } from './merchants/merchant-add/merchant-add.component';
import { MerchantDetailsComponent } from './merchants/merchant-details/merchant-details.component';
import { MerchantHomeComponent } from './merchants/merchant-home/merchant-home.component';
import { MerchantListComponent } from './merchants/merchant-list/merchant-list.component';
import { MerchantStartComponent } from './merchants/merchant-start/merchant-start.component';
import { MerchantUpdateComponent } from './merchants/merchant-update/merchant-update.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { OrderAddComponent } from './orders/order-add/order-add.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { OrderHomeComponent } from './orders/order-home/order-home.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderStartComponent } from './orders/order-start/order-start.component';
import { OrderUpdateComponent } from './orders/order-update/order-update.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductHomeComponent } from './products/product-home/product-home.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductStartComponent } from './products/product-start/product-start.component';
import { ProductUpdateComponent } from './products/product-update/product-update.component';
import { ProductsComponent } from './products/products.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingProductColorComponent } from './settings/setting-product-color/setting-product-color.component';
import { SettingProductSizeTypeComponent } from './settings/setting-product-size-type/setting-product-size-type.component';
import { SettingProductSizeComponent } from './settings/setting-product-size/setting-product-size.component';
import { SettingProductTypeComponent } from './settings/setting-product-type/setting-product-type.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    MerchantsComponent,
    ProductsComponent,
    OrdersComponent,
    InventoryComponent,
    ReportsComponent,
    MerchantAddComponent,
    MerchantUpdateComponent,
    MerchantHomeComponent,
    MerchantDetailsComponent,
    MerchantListComponent,
    MerchantStartComponent,
    SettingsComponent,
    ProductAddComponent,
    SettingProductTypeComponent,
    SettingProductColorComponent,
    SettingProductSizeTypeComponent,
    SettingProductSizeComponent,
    ProductHomeComponent,
    ProductDetailsComponent,
    ProductStartComponent,
    ProductListComponent,
    OrderDetailsComponent,
    OrderAddComponent,
    OrderHomeComponent,
    OrderListComponent,
    OrderStartComponent,
    ProductUpdateComponent,
    OrderUpdateComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  // public static apiLink = 'http://localhost:8080/ims/';
  public static apiLink = 'http://192.1.200.123:8080/ims/';
  // public static apiLink = 'https://projectinventory-dev.up.railway.app/ims/';

  public IP = '';
}
