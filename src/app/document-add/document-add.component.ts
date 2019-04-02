import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document/document.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';

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

  constructor(
    private docService: DocumentService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit() {
    this.addNewDoc();

    this.isLogin =  this.tokenStorage.isLogin();
    if(!this.tokenStorage.isLogin()){
      this.router.navigate(['/login']);
    }
    this.userService.getByUsername(this.tokenStorage.getUsername())
      .subscribe((data: any) => {
        this.curUser = data;
      });
  }

  addDoc() {     
    console.log(this.curUser.id)
    this.docService.addDocument(this.curUser.id, this.form)
      .subscribe(data => { 
        this.isFailed = false;
        this.router.navigate(['/document']);
      },        
      error => {
          console.log(error);
          this.errorMessage = error.error.message;
         this.isFailed = true;
         console.log( this.errorMessage)
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