import { Component, OnInit, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { fadeFilter, fadeTableItem, fadePaginator, fadeTable, fadeNameTable } from '../animations/animation';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    fadeFilter, fadeNameTable
  ]
})
export class ProfileComponent implements OnInit {

  form: any = {};
  curUser: User;
  isLogin: boolean = false;
  load: boolean = false;
  showSpinner: boolean;
  isEdit: boolean = false;

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private toast: ToastService,
    ) { }




  ngOnInit() {
    this.initUser();
    this.isLogin = this.tokenStorage.isLogin();
    if (!this.tokenStorage.isLogin()) {
      this.router.navigate(['/']);
    }
  }

  initUser() {
    this.showSpinner = true;
    this.userService.getByUsername(this.tokenStorage.getUsername())
      .subscribe((data: any) => {
        this.showSpinner = false;
        this.curUser = data;
        this.form.id = this.curUser.id;
        this.form.email = this.curUser.email;
        this.form.name = this.curUser.name;
        this.form.username = this.curUser.username;
        this.form.activationCode = this.curUser.activationCode;
        this.form.password = this.curUser.password;
        this.form.adress = this.curUser.adress;
        this.form.newpassword = '';
      });
  }

  update() {
    this.load = true;
    this.form.password = this.form.newpassword;
    console.log(this.form.newpassword);
    this.userService.updateUser(this.form)
      .subscribe(() => {
        this.initUser();
        if (this.form.newpassword === '') {
          this.toast.showSuccess("", "Account changed successfully.");
        } else {
          this.toast.showSuccess("", "Account changed successfully.");
          this.toast.showWarning("", "Check your email.");
        }
        this.load = false;
        this.isEdit = false;
        this.form.newpassword = null;
      },
        error => {
          console.log(error);
          this.form.newpassword = '';
          this.toast.showError("", error.error.message);
          this.load = false;
          this.isEdit = false;
          this.initUser();
        });
  }

  change() {
    this.isEdit = true;
  }

}
