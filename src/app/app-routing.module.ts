import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'merchants', component: MerchantsComponent, children:[]},
  { path: 'products', component: ProductsComponent, children:[]},
  { path: 'orders', component: OrdersComponent, children:[]},
  { path: 'inventory', component: InventoryComponent, children:[]},
  { path: '', redirectTo: 'dashboard', pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
