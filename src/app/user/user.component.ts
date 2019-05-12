import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { fadeFilter, fadeTableItem, fadePaginator, fadeTable, fadeNameTable } from '../animations/animation';
import { FilterObject } from '../models/filterObj.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [
    fadeFilter, fadeTableItem, fadePaginator, fadeTable, fadeNameTable
  ]
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
  filter: FilterObject = new FilterObject();
  showSpinner: boolean;
  showData: boolean;


  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private toast: ToastService) { }

  ngOnInit() {
    if (!this.tokenStorage.isLogin()) {
      this.router.navigate(['/login']);
    } else {
      this.role = this.tokenStorage.getAuthorities()[0];
      this.init();
      this.getAllUsers();
      this.isLogin = this.tokenStorage.isLogin();
    }
  }

  init() {
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


  initFilter() {
    this.filter.name = this.form.name;
    this.filter.email = this.form.email;
    this.filter.username = this.form.username;
    this.filter.activationCode = this.form.activationCode;
    this.filter.sortOrder = this.form.sortOrder;
    this.filter.sortField = this.form.sortField;
  }

  getAllUsers() {
    this.showSpinner = true;
    this.showData = false;
    this.initFilter();
    console.log(this.filter);
    this.userService.getUsersByFilter(this.page, this.size, this.filter)
      .subscribe((data: any) => {
        this.showSpinner = false;
        this.showData = true;
        this.listUsers = data['content'];
        this.pages = new Array(data['totalPages']);
        this.length = this.pages.length;
        this.totalElements = data['totalElements'];
      },
        error => {
          console.log(error.error.message);
        });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(data => {
      this.getAllUsers();
      this.toast.showSuccess('', 'User '+ user.username +' deleted successfully');
    });
    console.log(user.username);
  }

  deleteAll(): void {
    this.userService.deleteAll().subscribe(data => {
      this.getAllUsers();
      this.toast.showSuccess('', 'All users deleted successfully');
    });
    console.log("all");
  }


}
