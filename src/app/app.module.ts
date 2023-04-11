import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ReportsComponent } from './reports/reports.component';
import { DataTablesModule } from 'angular-datatables';
import { MerchantAddComponent } from './merchants/merchant-add/merchant-add.component';
import { MerchantUpdateComponent } from './merchants/merchant-update/merchant-update.component';
import { MerchantHomeComponent } from './merchants/merchant-home/merchant-home.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MerchantDetailsComponent } from './merchants/merchant-details/merchant-details.component';
import { MerchantListComponent } from './merchants/merchant-list/merchant-list.component';
import { MerchantStartComponent } from './merchants/merchant-start/merchant-start.component';
import { SettingsComponent } from './settings/settings.component';
import { RouterModule } from '@angular/router';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { SettingProductTypeComponent } from './settings/setting-product-type/setting-product-type.component';
import { SettingProductColorComponent } from './settings/setting-product-color/setting-product-color.component';
import { SettingProductSizeTypeComponent } from './settings/setting-product-size-type/setting-product-size-type.component';
import { SettingProductSizeComponent } from './settings/setting-product-size/setting-product-size.component';
import { ProductHomeComponent } from './products/product-home/product-home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductStartComponent } from './products/product-start/product-start.component';
import { ProductListComponent } from './products/product-list/product-list.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  public static apiLink = 'http://localhost:8080/ims/';
  // public static apiLink = 'http://192.1.200.123:8080/ims/';
}
