import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.css']
})
export class DocumentAddComponent implements OnInit {

  form: any = {};
  curUser: User;
  errorMessage = '';
  isFailed = false;
  isLogin = false;
  today = "";
  day;
  month;
  year;

  constructor(
    private docService: DocumentService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private toast: ToastService) { }

  ngOnInit() {
    if (!this.tokenStorage.isLogin()) {
      this.router.navigate(['/login']);
    }else{
    this.addNewDoc();
    this.initToday();
    this.isLogin = this.tokenStorage.isLogin();
    
    this.userService.getByUsername(this.tokenStorage.getUsername())
      .subscribe((data: any) => {
        this.curUser = data;
      });
    }
  }

  initToday() {
    this.day = new Date().getDay();
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
    if (this.day < 10) {
      this.day = '0' + this.day
    }
    if (this.month < 10) {
      this.month = '0' + this.month
    }
    this.today = this.year + "-" + this.month + "-" + this.day;
  }

  addDoc() {
    console.log(this.curUser.id)
    this.docService.addDocument(this.curUser.id, this.form)
      .subscribe(data => {
        this.isFailed = false;
        this.router.navigate(['/document']);
        this.toast.showSuccess("", "Document '" + data.title + "' created successfully");
      },
        error => {          
          console.log(error);
          this.errorMessage = error.error.message;
          this.isFailed = true;
          console.log(this.errorMessage)
        });
  }

  addNewDoc() {
    this.form.id = null;
    this.form.dateOfCreation = new Date();
    this.form.title = null;
    this.form.user = null;
    this.form.documentDescription = null;
    this.form.customer = null;
    this.form.filename = null;
    this.form.expired = null;
    this.form.contractTerm = null;
  }
}
