import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { MerchantAddComponent } from './merchants/merchant-add/merchant-add.component';
import { MerchantDetailsComponent } from './merchants/merchant-details/merchant-details.component';
import { MerchantHomeComponent } from './merchants/merchant-home/merchant-home.component';
import { MerchantStartComponent } from './merchants/merchant-start/merchant-start.component';
import { MerchantUpdateComponent } from './merchants/merchant-update/merchant-update.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductHomeComponent } from './products/product-home/product-home.component';
import { ProductStartComponent } from './products/product-start/product-start.component';
import { ProductsComponent } from './products/products.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingProductColorComponent } from './settings/setting-product-color/setting-product-color.component';
import { SettingProductSizeTypeComponent } from './settings/setting-product-size-type/setting-product-size-type.component';
import { SettingProductSizeComponent } from './settings/setting-product-size/setting-product-size.component';
import { SettingProductTypeComponent } from './settings/setting-product-type/setting-product-type.component';
import { SettingsComponent } from './settings/settings.component';
import { OrderAddComponent } from './orders/order-add/order-add.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { OrderHomeComponent } from './orders/order-home/order-home.component';
import { OrderStartComponent } from './orders/order-start/order-start.component';
import { ProductUpdateComponent } from './products/product-update/product-update.component';
import { OrderUpdateComponent } from './orders/order-update/order-update.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'merchants/add', component: MerchantAddComponent },
  { path: 'merchants/edit/:id', component: MerchantUpdateComponent },
  {
    path: 'merchants',
    component: MerchantsComponent,
    children: [
      {
        path: '',
        component: MerchantHomeComponent,
        children: [
          { path: ':id', component: MerchantDetailsComponent },
          { path: '', component: MerchantStartComponent },
        ],
      },
    ],
  },
  { path: 'products/add', component: ProductAddComponent },
  { path: 'products/edit/:id', component: ProductUpdateComponent },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ProductHomeComponent,
        children: [
          { path: ':id', component: ProductDetailsComponent },
          { path: '', component: ProductStartComponent },
        ],
      },
    ],
  },
  { path: 'orders/add', component: OrderAddComponent },
  { path: 'orders/edit/:id', component: OrderUpdateComponent },
  {
    path: 'orders',
    component: OrdersComponent,
    children: [
      {
        path: '',
        component: OrderHomeComponent,
        children: [
          { path: ':id', component: OrderDetailsComponent },
          { path: '', component: OrderStartComponent },
        ],
      },
    ],
  },
  { path: 'inventory', component: InventoryComponent, children: [] },
  { path: 'reports', component: ReportsComponent, children: [] },
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      { path: 'productType', component: SettingProductTypeComponent },
      { path: 'productColor', component: SettingProductColorComponent },
      { path: 'productSize', component: SettingProductSizeComponent },
      { path: 'productSizeType', component: SettingProductSizeTypeComponent },
      { path: '', redirectTo: 'productType', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
