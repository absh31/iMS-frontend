import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { MerchantAddComponent } from './merchants/merchant-add/merchant-add.component';
import { MerchantDetailsComponent } from './merchants/merchant-details/merchant-details.component';
import { MerchantHomeComponent } from './merchants/merchant-home/merchant-home.component';
import { MerchantStartComponent } from './merchants/merchant-start/merchant-start.component';
import { MerchantUpdateComponent } from './merchants/merchant-update/merchant-update.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { OrderAddComponent } from './orders/order-add/order-add.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { OrderHomeComponent } from './orders/order-home/order-home.component';
import { OrderStartComponent } from './orders/order-start/order-start.component';
import { OrderUpdateComponent } from './orders/order-update/order-update.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductHomeComponent } from './products/product-home/product-home.component';
import { ProductStartComponent } from './products/product-start/product-start.component';
import { ProductUpdateComponent } from './products/product-update/product-update.component';
import { ProductsComponent } from './products/products.component';
import { ReportsComponent } from './reports/reports.component';
import { AuthGuard } from './services/auth.guard';
import { SettingProductColorComponent } from './settings/setting-product-color/setting-product-color.component';
import { SettingProductSizeTypeComponent } from './settings/setting-product-size-type/setting-product-size-type.component';
import { SettingProductSizeComponent } from './settings/setting-product-size/setting-product-size.component';
import { SettingProductTypeComponent } from './settings/setting-product-type/setting-product-type.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: 'merchants/add', component: MerchantAddComponent,
  canActivate: [AuthGuard] },
  { path: 'merchants/edit/:id', component: MerchantUpdateComponent,
  canActivate: [AuthGuard] },
  {
    path: 'merchants',
    component: MerchantsComponent,
    canActivate: [AuthGuard],
    canActivateChild:[AuthGuard],
    children: [
      {
        path: '',
        component: MerchantHomeComponent,
        canActivate: [AuthGuard],
        canActivateChild:[AuthGuard],
        children: [
          { path: ':id', component: MerchantDetailsComponent },
          { path: '', component: MerchantStartComponent },
        ],
      },
    ],
  },
  { path: 'products/add', component: ProductAddComponent,
  canActivate: [AuthGuard] },
  { path: 'products/edit/:id', component: ProductUpdateComponent,
  canActivate: [AuthGuard] },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
    canActivateChild:[AuthGuard],
    children: [
      {
        path: '',
        component: ProductHomeComponent,
    canActivate: [AuthGuard],
    canActivateChild:[AuthGuard],
        children: [
          { path: ':id', component: ProductDetailsComponent },
          { path: '', component: ProductStartComponent },
        ],
      },
    ],
  },
  { path: 'orders/add', component: OrderAddComponent,
  canActivate: [AuthGuard] },
  { path: 'orders/edit/:id', component: OrderUpdateComponent,
  canActivate: [AuthGuard] },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
    canActivateChild:[AuthGuard],
    children: [
      {
        path: '',
        component: OrderHomeComponent,
    canActivate: [AuthGuard],
    canActivateChild:[AuthGuard],
        children: [
          { path: ':id', component: OrderDetailsComponent },
          { path: '', component: OrderStartComponent },
        ],
      },
    ],
  },
  { path: 'inventory', component: InventoryComponent,
  canActivate: [AuthGuard], children: [] },
  { path: 'reports', component: ReportsComponent,
  canActivate: [AuthGuard], children: [] },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    canActivateChild:[AuthGuard],
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
