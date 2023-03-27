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
import { ProductsComponent } from './products/products.component';
import { ReportsComponent } from './reports/reports.component';
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
  { path: 'products', component: ProductsComponent, children: [] },
  { path: 'orders', component: OrdersComponent, children: [] },
  { path: 'inventory', component: InventoryComponent, children: [] },
  { path: 'reports', component: ReportsComponent, children: [] },
  { path: 'settings', component: SettingsComponent, children: [] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
