import { Component, OnInit } from '@angular/core';
import { fadeFilter, fadeTableItem, fadePaginator, fadeTable, fadeNameTable } from '../../animations/animation';
import { FilterObject } from 'src/app/models/filterObj.model';
import { WorkContract } from 'src/app/models/contracts/work-contract.model';
import { User } from 'src/app/models/user.model';
import { CooperationContractService } from 'src/app/services/contracts/cooperation-contract.service';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { CooperationContract } from 'src/app/models/contracts/cooperation-contract.model';
import { WorkContractService } from 'src/app/services/contracts/work-contract.service';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css'],
  animations: [
    fadeFilter, fadeTableItem, fadePaginator, fadeTable, fadeNameTable
  ]
})
export class WorkListComponent implements OnInit {

  
  form: any = {}
  filter: FilterObject = new FilterObject();
  listDocs: WorkContract[] = [];
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
  showSpinner: boolean;
  showData: boolean;
  kindOfDoc: number = 1;

  constructor(    
    private workService: WorkContractService,    
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private toast: ToastService) { }

  ngOnInit() {
    this.userService.saveKindOfContract("1");
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
    this.form.isActive = "";
    this.form.fromDate = "";
    this.form.toDate = "";
    this.form.sortOrder = "ASC";
    this.form.sortField = "title";    
    this.form.clientFullname = '';
    this.form.clientAdress = '';      
    this.form.lastChange = ''; 
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
    this.filter.title = this.form.title;
    this.filter.clientFullname= this.form.clientFullname;
    this.filter.clientAdress= this.form.clientAdress;    
    this.filter.lastChange= this.form.lastChange;
    this.filter.isActive= this.form.isActive;
    this.filter.sortField= this.form.sortField;
    this.filter.sortOrder= this.form.sortOrder;
    this.filter.fromDate= this.form.fromDate;
    this.filter.toDate= this.form.toDate;

    this.filter.username= this.form.username;
    /*this.filter.name= this.form.name;
    this.filter.email= this.form.email;
    this.filter.activationCode= this.form.activationCode;*/
  }

  getAllDocs(): void {

    this.showSpinner = true;
    this.showData = false;
    if (this.role == 'ROLE_USER') {
      this.form.username = this.username;
    }
    this.initFilter();
    console.log(this.filter);
         
      this.workService.getByFilter(this.filter, this.page, this.size)
      .subscribe(data => {
        this.showSpinner = false;
        this.showData = true;
        this.listDocs = data['content'];        
        this.pages = new Array(data['totalPages']);
        this.length = this.pages.length;
        this.totalElements = data['totalElements'];
        this.viewPages();        
        console.log(this.listDocs);
      },
        error => {
          console.log(error);
        });
       
  }

  deleteDocument(doc: WorkContract): void {
      this.workService.deleteById(doc.id).subscribe(data => {
        this.setPage(0);      
        this.toast.showSuccess('', 'Cooperation contracts deleted successfully');
      });
      
    console.log(doc.title);
  }

  deleteAll(): void {    
      this.workService.deleteAll().subscribe(data => {
        this.getAllDocs();
        this.toast.showSuccess('', 'All cooperation contracts deleted successfully');
      });
       
    console.log("all");
  }

  docEdit(doc: WorkContract) {
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
