import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { Router } from '@angular/router';
import { Login } from './auth/login';
import { AuthService } from './auth/auth.service';
import { ToastService } from './services/toast.service';
import { SignUp } from './auth/signup';
import { loginOut, fadeTableItem } from './animations/animation';
import { ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    loginOut, fadeTableItem
  ]
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
  showLoadingIndicator = true;
  @ViewChild('closeReg') closeReg: ElementRef;
  @ViewChild('closeLog') closeLog: ElementRef;


  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
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

  onSubmitl(form: NgForm) {
    this.loginInfo = new Login(
      this.form1.usernamel,
      this.form1.passwordl);

    console.log(this.loginInfo);
    this.authService.signIn(this.loginInfo).subscribe(
      data => {
        this.closeLog.nativeElement.click();
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.tokenStorage.saveExpriration(data.expiration);
        this.init();
        form.resetForm();
        console.log(this.tokenStorage.getExpriration());
        console.log(new Date());
      },
      error => {
        console.log(error);
        this.toast.showError("", error.error.message)

      }
    );
  }

  onSubmitr(form: NgForm) {

    this.load = true;

    this.signupInfo = new SignUp(
      this.form2.namer,
      this.form2.usernamer,
      this.form2.emailr,
      this.form2.passwordr);
    console.log(this.signupInfo);
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.closeReg.nativeElement.click();
        console.log(data);
        this.load = false;
        this.isLogin = true;
        this.toast.showSuccess("", "Successful registration!");
        this.toast.showWarning("", "Please check your email and confirm account");
        form.resetForm();
      },
      error => {
        console.log(error.error.message);
        //this.errorMessage = error.error.message;
        this.load = false;
        this.toast.showError("", error.error.message);
      }
    );

  }

  

  logout() {
    this.authority = null;
    this.tokenStorage.signOut();
  }

}
