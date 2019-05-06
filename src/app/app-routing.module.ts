import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';


import { ProfileComponent } from './profile/profile.component';
import { DocumentAddPatternComponent } from './document-add-pattern/document-add-pattern.component';
import { WorkContractComponent } from './documents-add/work-contract/work-contract.component';
import { CreditContractComponent } from './documents-add/credit-contract/credit-contract.component';
import { CooperationContractComponent } from './documents-add/cooperation-contract/cooperation-contract.component';
import { ContractOfSaleComponent } from './documents-add/contract-of-sale/contract-of-sale.component';
import { RentalContractComponent } from './documents-add/rental-contract/rental-contract.component';
import { DocumentPatternComponent } from './document-pattern/document-pattern.component';
import { RentalEditComponent } from './documents-edit/rental-edit/rental-edit.component';
import { SaleEditComponent } from './documents-edit/sale-edit/sale-edit.component';
import { CooperationEditComponent } from './documents-edit/cooperation-edit/cooperation-edit.component';
import { CreditEditComponent } from './documents-edit/credit-edit/credit-edit.component';
import { WorkEditComponent } from './documents-edit/work-edit/work-edit.component';


 
const routes: Routes = [    
    
    {
        path: 'document-pattern',
        component: DocumentPatternComponent
    },
    {
        path: 'work-contract',
        component: WorkContractComponent
    },
    {
        path: 'credit-contract',
        component: CreditContractComponent
    },
    {
        path: 'cooperation-contract',
        component: CooperationContractComponent
    },
    {
        path: 'contract-of-sale',
        component: ContractOfSaleComponent
    },
    {
        path: 'rental-contract',
        component: RentalContractComponent
    },
    {
        path: 'work-edit',
        component: WorkEditComponent
    },
    {
        path: 'credit-edit',
        component: CreditEditComponent
    },
    {
        path: 'cooperation-edit',
        component: CooperationEditComponent
    },
    {
        path: 'sale-edit',
        component: SaleEditComponent
    },
    {
        path: 'rental-edit',
        component: RentalEditComponent
    },
    {
        path: 'document-add-pattern',
        component: DocumentAddPatternComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },     
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    }
];
 
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
