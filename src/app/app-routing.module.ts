import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { UserComponent } from './user/user.component';
import { DocumentComponent } from './document/document.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { DocumentAddComponent } from './document-add/document-add.component';
import { ProfileComponent } from './profile/profile.component';

 
const routes: Routes = [
    
    {
        path: 'document',
        component: DocumentComponent
    },
    {
        path: 'document-edit',
        component: DocumentEditComponent
    },
    {
        path: 'document-add',
        component: DocumentAddComponent
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
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: RegisterComponent
    },
    
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
    }
];
 
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
