import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { load } from '@angular/core/src/render3';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: any = {};
  curUser: User;
  isLogin = false;
  load = false;

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private toast: ToastService) { }

  ngOnInit() {
    this.initUser();
    this.isLogin = this.tokenStorage.isLogin();
    if (!this.tokenStorage.isLogin()) {
      this.router.navigate(['/login']);
    }
  }

  initUser() {
    this.userService.getByUsername(this.tokenStorage.getUsername())
      .subscribe((data: any) => {
        this.curUser = data;
        this.form.id = this.curUser.id;
        this.form.email = this.curUser.email;
        this.form.name = this.curUser.name;
        this.form.username = this.curUser.username;
        this.form.activationCode = this.curUser.activationCode;
        this.form.password = this.curUser.password;
        this.form.newpassword = '';
      });
  }

  updatePassword() {
    this.load = true;
    var openedToast = null;
    openedToast = this.toast.showInfo("", "Check password...");
    this.userService.updatePass(this.curUser, this.form.newpassword)
      .subscribe(() => {
        this.initUser();
        this.form.newpassword = null;
        this.toast.deleteToast(openedToast);
        this.toast.showSuccess("", "Password changed successfully. Check your email");
        this.load = false;
      },
        error => {
          console.log(error);
          this.form.newpassword = null;
          this.toast.deleteToast(openedToast);
          this.toast.showError("", error.error.message);
          this.load = false;
        });
  }

}
