import { Component, OnInit } from '@angular/core';
import { DocumentService } from './document.service';
import { Document } from './document.model';
import { TokenStorageService } from '../auth/token-storage.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from '../user/user.model';
import { CheckType } from '@angular/core/src/view';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  listDocs: Document[] = [];
  private username: string; 
  private role: string; 
  searchStr = '';
  bool = false;
  size: number = 5;
  sizes: Array<number>;
  page: number = 0;
  pages:Array<number>;
  length: number;
  isLogin = false;
 

  constructor(
    private documentService: DocumentService, 
    private tokenStorage: TokenStorageService,
    private router: Router) { }
 
  ngOnInit() {
    this.role = this.tokenStorage.getAuthorities()[0];
    this.getAllDocs();   
    this.sizes = [5, 10, 25, 50];   
    this.isLogin =  this.tokenStorage.isLogin();
    if(!this.tokenStorage.isLogin()){
      this.router.navigate(['/login']);
    }
  }

  setSize(s: number){  
    this.size = s; 
    this.getAllDocs();
    this.setPage(0)  ; 
    console.log("page "+this.page)
  }

  setPage(i: number){    
    this.page = i;
    this.getAllDocs();
    console.log("set page "+this.page)
  }

  nextPage(value: boolean){
    if(value){
      this.page = this.page + 1;
    }else{
      this.page = this.page - 1;
    }
    this.getAllDocs();
    console.log(this.page)
  }

  getAllDocs(): void {
    this.documentService.getAll(this.page, this.size)
    .subscribe( data => {
      this.listDocs = data['content'];
      this.pages = new Array(data['totalPages']);
      this.length = this.pages.length;
      console.log(data)
    });
  }

  deleteDocument(doc: Document): void {
    this.documentService.deleteDocument(doc.id).subscribe(data=> {
      this.getAllDocs();
    });
    console.log(doc.id);
  }

  deleteAll(): void {
    this.documentService.deleteAll().subscribe(data=> {
      this.getAllDocs();
    });
  }

  docEdit(doc: Document){
    window.sessionStorage.setItem("docId", doc.id.toString());    
  }
  
}
