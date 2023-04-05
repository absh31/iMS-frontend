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
import { ProductsComponent } from './products/products.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingProductColorComponent } from './settings/setting-product-color/setting-product-color.component';
import { SettingProductSizeTypeComponent } from './settings/setting-product-size-type/setting-product-size-type.component';
import { SettingProductTypeComponent } from './settings/setting-product-type/setting-product-type.component';
import { SettingsComponent } from './settings/settings.component';

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
  { path: 'products', component: ProductsComponent, children: [] },
  { path: 'orders', component: OrdersComponent, children: [] },
  { path: 'inventory', component: InventoryComponent, children: [] },
  { path: 'reports', component: ReportsComponent, children: [] },
  { 
    path: 'settings', 
    component: SettingsComponent, 
    children: [
      { path: 'productType', component: SettingProductTypeComponent},
      { path: 'productColor', component: SettingProductColorComponent},
      { path: 'productSizeType', component: SettingProductSizeTypeComponent},
      { path: '', redirectTo : 'productType', pathMatch : 'full'}
    ] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
