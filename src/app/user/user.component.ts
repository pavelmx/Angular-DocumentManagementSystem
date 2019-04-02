import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  form: any = {}
  listUsers: User[] = [];
  role: string;
  isLogin = false;
  errorMessage = '';
  size: number = 5;
  page: number = 0;
  sizes: Array<number>;
  pages: Array<number>;
  length: number;
  totalElements: number;
  

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit() {
    this.role = this.tokenStorage.getAuthorities()[0];
    this.init();
    this.getAllUsers();
    this.isLogin = this.tokenStorage.isLogin();
    if (!this.tokenStorage.isLogin()) {
      this.router.navigate(['/login']);
    }
  }

  init(){
    this.role = this.tokenStorage.getAuthorities()[0];
    this.isLogin = this.tokenStorage.isLogin();    
    this.sizes = [5, 10, 25, 50];
    this.form.username = "";
    this.form.name = "";
    this.form.email = "";
    this.form.sortOrder = "ASC";
    this.form.sortField = "username";
    this.form.activationCode = "";
  }
    
  setSize(s: number) {
    this.size = s;    
    this.setPage(0);
    console.log("page " + this.page)
  }

  setPage(i: number) {
    this.page = i;
    this.getAllUsers();
    console.log("set page " + this.page)
  }

  nextPage(value: boolean) {
    if (value) {
      this.page = this.page + 1;
    } else {
      this.page = this.page - 1;
    }
    this.getAllUsers();
    console.log(this.page)
  }

  getAllUsers() {
    this.userService.getUsersByFilter(this.page, this.size, this.form.sortField, 
      this.form.sortOrder, this.form.name, this.form.username, this.form.email, this.form.activationCode)
           .subscribe((data: any) => {
        this.listUsers = data['content'];        
        this.pages = new Array(data['totalPages']);
        this.length = this.pages.length;
        this.totalElements = data['totalElements'];
      },
      error =>{
        this.errorMessage = error.error.message;
      });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(data => {
      this.getAllUsers();
    });
    console.log(user.id);
  }

  deleteAll(): void {
    this.userService.deleteAll().subscribe(data => {
      this.getAllUsers();
    });
  }


}
