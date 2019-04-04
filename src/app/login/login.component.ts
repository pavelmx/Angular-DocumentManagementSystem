import { Component, OnInit } from '@angular/core';
 
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Login } from '../auth/login';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  username: string;
  isAuthenticated = false;

  
  roles: string[] = [];
  private loginInfo: Login;
 
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService, 
    private router: Router,
    private toast: ToastService) { }
 
    ngOnInit() {   
    
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.username = this.tokenStorage.getUsername();
      this.isAuthenticated = true;
    }
    
  }
 
  

  onSubmit() { 
    this.loginInfo = new Login(
      this.form.username,
      this.form.password);
 
    this.authService.signIn(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.isAuthenticated = true;
        this.roles = this.tokenStorage.getAuthorities();
        console.log(this.isAuthenticated);
        
        },
      error => {
        console.log(error);
        this.toast.showError("", error.error.message)        
        this.isAuthenticated = false;
      }
    );
  }
 

  
}
