import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { Router } from '@angular/router';
import { Login } from './auth/login';
import { AuthService } from './auth/auth.service';
import { ToastService } from './services/toast.service';
import { SignUp } from './auth/signup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  roles: string[];
  authority: string;
  username: string;
  token: string;
  form1: any = {};
  form2: any = {};
  loginInfo: Login;
  isLogin = true;
 
  signupInfo: SignUp;
  isSignedUp = false;
  errorMessage = '';
  load = false;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private toast: ToastService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    if (this.tokenStorage.getToken()) {
      this.token = this.tokenStorage.getToken();
      this.username = this.tokenStorage.getUsername();
      this.roles = this.tokenStorage.getAuthorities();
      if (this.roles[0] === 'ROLE_ADMIN') {
        this.authority = 'admin';
      } else {
        this.authority = 'user';
      }
    }
    console.log(this.authority);
  }

  onSubmitl() {
    this.loginInfo = new Login(
      this.form1.username,
      this.form1.password);
      console.log(this.loginInfo);
    this.authService.signIn(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.init();
        
        console.log("ok");
        console.log(this.authority);
      },
      error => {
        console.log(error);
        this.toast.showError("", error.error.message)

      }
    );
  }

  onSubmitr() {
    
    this.load = true;
    
    var openedToast = null;
    openedToast = this.toast.showInfo("", "Registration process...");

    this.signupInfo = new SignUp(
      this.form2.name,
      this.form2.username,
      this.form2.email,
      this.form2.password);
      console.log(this.signupInfo);
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        
        this.load = false;   
        this.isLogin = true;       
        this.toast.deleteToast(openedToast);
        this.toast.showSuccess("","Successful registration!");
        this.toast.showWarning("", "Please check your email and confirm account");
      },
      error => {
        console.log(error.error.message);
        this.errorMessage = error.error.message;        
        this.load = false;       
        this.toast.deleteToast(openedToast);
        this.toast.showError("", error.error.message);
      }
    );
  
}

  logout() {
    this.authority = null;
    this.tokenStorage.signOut();
    this.form1.username = '';
    this.form1.password = '';
    this.form2.username = '';
    this.form2.password = '';
    this.form2.cpassword = '';
    this.form2.name = '';
    this.form2.email = '';
  }



}
