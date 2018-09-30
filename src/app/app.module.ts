import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AllDataComponent } from './all-data/all-data.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { BillingComponent } from './billing/billing.component';
import { SalesComponent } from './sales/sales.component';
import { InsertDataComponent } from './insert-data/insert-data.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { SearchDataComponent } from './search-data/search-data.component';


const routes = [
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: 'inventory',
    pathMatch: 'full',
    component: InventoryComponent
  },
  {
    path: 'billing',
    pathMatch: 'full',
    component: BillingComponent
  },
  {
    path: 'sales',
    pathMatch: 'full',
    component: SalesComponent
  },
  {
    path: 'showAll',
    pathMatch: 'full',
    component: AllDataComponent
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'insert',
    pathMatch: 'full',
    component: InsertDataComponent
  },
  {
    path: 'update',
    pathMatch: 'full',
    component: UpdateDataComponent
  },
  {
    path: 'search',
    pathMatch: 'full',
    component: SearchDataComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    AllDataComponent,
    LoginComponent,
    DashboardComponent,
    InventoryComponent,
    BillingComponent,
    SalesComponent,
    InsertDataComponent,
    UpdateDataComponent,
    SearchDataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
