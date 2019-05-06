import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component'; 
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { SearchPipe } from './pipes/search.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { ProfileComponent } from './profile/profile.component';
import { DocumentAddPatternComponent } from './document-add-pattern/document-add-pattern.component';
import { WorkContractComponent } from './documents-add/work-contract/work-contract.component';
import { CreditContractComponent } from './documents-add/credit-contract/credit-contract.component';
import { ContractOfSaleComponent } from './documents-add/contract-of-sale/contract-of-sale.component';
import { CooperationContractComponent } from './documents-add/cooperation-contract/cooperation-contract.component';
import { RentalContractComponent } from './documents-add/rental-contract/rental-contract.component';
import { DocumentPatternComponent } from './document-pattern/document-pattern.component';
import { WorkListComponent } from './documents/work-list/work-list.component';
import { CreditListComponent } from './documents/credit-list/credit-list.component';
import { CooperationListComponent } from './documents/cooperation-list/cooperation-list.component';
import { RentalListComponent } from './documents/rental-list/rental-list.component';
import { SaleListComponent } from './documents/sale-list/sale-list.component';
import { WorkEditComponent } from './documents-edit/work-edit/work-edit.component';
import { SaleEditComponent } from './documents-edit/sale-edit/sale-edit.component';
import { CooperationEditComponent } from './documents-edit/cooperation-edit/cooperation-edit.component';
import { CreditEditComponent } from './documents-edit/credit-edit/credit-edit.component';
import { RentalEditComponent } from './documents-edit/rental-edit/rental-edit.component';



 
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,       
    SearchPipe,
    FilterPipe,
    ProfileComponent,
    DocumentAddPatternComponent,
    WorkContractComponent,
    CreditContractComponent,
    ContractOfSaleComponent,
    CooperationContractComponent,
    RentalContractComponent,
    DocumentPatternComponent,
    WorkListComponent,
    CreditListComponent,
    CooperationListComponent,
    RentalListComponent,
    SaleListComponent,
    WorkEditComponent,
    SaleEditComponent,
    CooperationEditComponent,
    CreditEditComponent,
    RentalEditComponent
    
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({timeOut: 5000, positionClass: 'toast-top-right'})
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { } 
