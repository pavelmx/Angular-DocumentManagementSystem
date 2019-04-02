import { Component, OnInit } from '@angular/core';
import { DocumentService } from './document.service';
import { Document } from './document.model';
import { TokenStorageService } from '../auth/token-storage.service';

import { User } from '../user/user.model';

import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  form: any = {}
  listDocs: Document[] = [];
  listUsers: User[] = [];
  totalElements: number;
  role: string;
  username: string;
  searchStr = '';
  bool = false;
  sizes: Array<number>;
  pages: Array<number>;
  length: number;
  isLogin = false;
  label: string;
  size: number = 5;
  page: number = 0;



  constructor(
    private documentService: DocumentService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit() {    
    this.init();
    this.getAllDocs();   

    if (this.role == 'ROLE_ADMIN') {
      this.userService.getAll()
        .subscribe(data => {
          this.listUsers = data;
        });
    }
    
    if (!this.tokenStorage.isLogin()) {
      this.router.navigate(['/login']);
    }
  }

init(){
  this.role = this.tokenStorage.getAuthorities()[0];
  this.username = this.tokenStorage.getUsername();
  this.isLogin = this.tokenStorage.isLogin();
  this.label = "All";
  this.sizes = [5, 10, 25, 50];
  this.form.username = "";
  this.form.title = "";
  this.form.customer = "";
  this.form.expired = "";
  this.form.fromDate = "";
  this.form.toDate = "";
  this.form.sortOrder = "ASC";
  this.form.sortField = "title";
}

  setSize(s: number) {
    this.size = s;    
    this.setPage(0);
    console.log("page " + this.page)
  }

  setPage(i: number) {
    this.page = i;
    this.getAllDocs();
    console.log("set page " + this.page)
  }

  nextPage(value: boolean) {
    if (value) {
      this.page = this.page + 1;
    } else {
      this.page = this.page - 1;
    }
    this.getAllDocs();
    console.log(this.page)
  }

  getAllDocs(): void {
    if (this.role == 'ROLE_USER') {
      this.form.username = this.username;
    }    
    console.log(this.form.sortField + " " +this.form.sortOrder);
    this.documentService.getDocsByFilter(this.form.title, this.form.customer, this.form.username, 
      this.form.fromDate, this.form.toDate, this.form.expired, this.page, this.size, 
      this.form.sortField, this.form.sortOrder)
      .subscribe(data => {
        this.listDocs = data['content'];
        this.pages = new Array(data['totalPages']);
        this.length = this.pages.length;
        this.totalElements = data['totalElements'];
      },
        error => {
          console.log(error);
        });
  }

  deleteDocument(doc: Document): void {
    this.documentService.deleteDocument(doc.id).subscribe(data => {
      this.getAllDocs();
    });
    console.log(doc.id);
  }

  deleteAll(): void {
    this.documentService.deleteAll().subscribe(data => {
      this.getAllDocs();
    });
  }

  docEdit(doc: Document) {
    window.sessionStorage.setItem("docId", doc.id.toString());
  }

}