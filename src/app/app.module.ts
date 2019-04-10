import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component'; 
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { DocumentComponent } from './document/document.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { SearchPipe } from './pipes/search.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { DocumentAddComponent } from './document-add/document-add.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';


 
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,    
    DocumentComponent,
    DocumentEditComponent,    
    SearchPipe,
    FilterPipe,
    DocumentAddComponent,
    ProfileComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
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
