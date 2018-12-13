import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';

import { AppComponent } from './app.component';
import { AllDataComponent } from './all-data/all-data.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SalesComponent } from './sales/sales.component';
import { InsertDataComponent } from './insert-data/insert-data.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { SearchDataComponent } from './search-data/search-data.component';
import { SellComponent } from './sell/sell.component';
import { RecieptComponent } from './reciept/reciept.component';
import { ReceiptGenerationComponent } from './receipt-generation/receipt-generation.component';
import { FilterPipe} from './insert-data/filter.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DeleteComponent } from './delete/delete.component';
import {SelectModule} from 'ng2-select';


const routes: Routes = [
  {
    path: 'receipt',
    component: RecieptComponent
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
  {
    path: 'dublicate-receipt',
    pathMatch: 'full',
    component: ReceiptGenerationComponent
  },
  {
    path: 'sell',
    pathMatch: 'full',
    component: SellComponent
  },
  {
    path: 'delete',
    pathMatch: 'full',
    component: DeleteComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    AllDataComponent,
    LoginComponent,
    SalesComponent,
    InsertDataComponent,
    UpdateDataComponent,
    SearchDataComponent,
    SellComponent,
    RecieptComponent,
    ReceiptGenerationComponent,
    FilterPipe,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    DlDateTimePickerDateModule,
    NgMultiSelectDropDownModule.forRoot(),
    SelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
