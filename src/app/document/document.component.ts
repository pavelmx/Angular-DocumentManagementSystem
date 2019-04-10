import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { Document } from '../models/document.model';
import { TokenStorageService } from '../auth/token-storage.service';
import 'jspdf-autotable';
import * as jsPDF from 'jspdf';
import { User } from '../models/user.model';
import { Filter } from '../models/filter.model';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  form: any = {}
  filter: Filter = new Filter();
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
    private router: Router,
    private toast: ToastService) { }

  ngOnInit() {

    if (!this.tokenStorage.isLogin()) {
      this.router.navigate(['/login']);
    } else {
      this.init();
      this.getAllDocs();

      if (this.role == 'ROLE_ADMIN') {
        this.userService.getAll()
          .subscribe(data => {
            this.listUsers = data;
          });
      }
    }

  }

  init() {
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

  initFilter() {
    this.filter.customer = this.form.customer;
    this.filter.expired = this.form.expired;
    this.filter.username = this.form.username;
    this.filter.title = this.form.title;
    this.filter.fromDate = this.form.fromDate;
    this.filter.toDate = this.form.toDate;
    this.filter.sortOrder = this.form.sortOrder;
    this.filter.sortField = this.form.sortField;
  }

  getAllDocs(): void {
    if (this.role == 'ROLE_USER') {
      this.form.username = this.username;
    }
    this.initFilter();

    console.log(this.filter);
    this.documentService.getDocsByFilter(this.filter, this.page, this.size)
      .subscribe(data => {
        this.listDocs = data['content'];
        this.pages = new Array(data['totalPages']);
        this.length = this.pages.length;
        this.totalElements = data['totalElements'];
        this.viewPages();
        console.log(this.pages);
      },
        error => {
          console.log(error);
        });
  }

  deleteDocument(doc: Document): void {
    this.documentService.deleteDocument(doc.id).subscribe(data => {
      this.getAllDocs();
      this.toast.showSuccess('', 'Document deleted successfully');
    });
    console.log(doc.title);
  }

  deleteAll(): void {
    this.documentService.deleteAll().subscribe(data => {
      this.getAllDocs();
      this.toast.showSuccess('', 'All documents deleted successfully');
    });
    console.log("all");
  }

  docEdit(doc: Document) {
    window.sessionStorage.setItem("docId", doc.id.toString());
  }

  viewPages() {
    if (this.length > 7) {
      var totalPages = this.length;
      var pageNumber = this.page + 1
      console.log(totalPages)
      var head = (pageNumber > 4) ? [1, -1] : [1, 2, 3];
      var tail = (pageNumber < totalPages - 3) ? [-1, totalPages] : [totalPages - 2, totalPages - 1, totalPages];
      var bodyBefore = (pageNumber > 4 && pageNumber < totalPages - 1) ? [pageNumber - 2, pageNumber - 1] : [];
      var bodyAfter = (pageNumber > 2 && pageNumber < totalPages - 3) ? [pageNumber + 1, pageNumber + 2] : [];

      var body = head.concat(bodyBefore).concat((pageNumber > 3 && pageNumber < totalPages - 2) ? [pageNumber] : []).concat(bodyAfter).concat(tail);
      this.pages = body;
    }
    else {
      var body2: number[] = [1];    
      var i: number ;      
      for (i = 2; i < this.length+1; i++) {
        body2.push(i)
      }
      this.pages = body2;
    }
  }

}
