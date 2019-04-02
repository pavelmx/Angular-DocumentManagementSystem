import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: any = {};
  curUser: User;
  isLogin = false;

  constructor(
    private userService: UserService, 
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getByUsername(this.tokenStorage.getUsername())
      .subscribe((data: any) => {
        this.curUser = data;
        this.initUser();
      });
      this.isLogin =  this.tokenStorage.isLogin();
      if(!this.tokenStorage.isLogin()){
        this.router.navigate(['/login']);
      }
  }

  initUser() {    
    this.form.id = this.curUser.id;
    this.form.email = this.curUser.email;
    this.form.name = this.curUser.name;
    this.form.username = this.curUser.username; 
    this.form.activationCode = this.curUser.activationCode;   
    this.form.password = this.curUser.password;   
  }

}
