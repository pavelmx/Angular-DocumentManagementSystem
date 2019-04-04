import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { Router } from '@angular/router';
import { Login } from './auth/login';
import { AuthService } from './auth/auth.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  roles: string[];
  authority: string;
  username: string;
  token: any;
  form: any = {};
  private loginInfo: Login;

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

  onSubmit() {
    this.loginInfo = new Login(
      this.form.username,
      this.form.password);

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

  logout() {
    this.authority = null;
    this.tokenStorage.signOut();
  }



}
