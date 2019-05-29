import { Component, OnInit } from '@angular/core';
import { CreditContractService } from 'src/app/services/contracts/credit-contract.service';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { CreditContract } from 'src/app/models/contracts/credit-contract.model';
import { FilterObject } from 'src/app/models/filterObj.model';
import { User } from 'src/app/models/user.model';
import { fadeFilter, fadeTableItem, fadePaginator, fadeTable, fadeNameTable } from '../../animations/animation';
import { FilterService } from 'src/app/services/filter.service';


@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.css'],
  animations: [
    fadeFilter, fadeTableItem, fadePaginator, fadeTable, fadeNameTable
  ]
})
export class CreditListComponent implements OnInit {

  form: any = {}
  filter: FilterObject = new FilterObject();
  listDocs: CreditContract[] = [];
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
    private creditService: CreditContractService,    
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private toast: ToastService,
    private filterService: FilterService) { }

  ngOnInit() {
    this.userService.saveKindOfContract("2");
    if (!this.tokenStorage.isLogin()) {
      this.router.navigate(['/']);
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
    this.label = "All users";
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
    this.form.toCreditAmount =null;
    this.form.toAnnualInterest =null;
    this.form.toTerm =null;
    this.form.fromCreditAmount =null;
    this.form.fromAnnualInterest =null;
    this.form.fromTerm =null;
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
    this.filter.toCreditAmount =this.form.toCreditAmount;
    this.filter.toAnnualInterest =this.form.toAnnualInterest;
    this.filter.toTerm =this.form.toTerm;
    this.filter.fromCreditAmount =this.form.fromCreditAmount;
    this.filter.fromAnnualInterest =this.form.fromAnnualInterest;
    this.filter.fromTerm =this.form.fromTerm;
  }

  getAllDocs(): void {

    this.showSpinner = true;
    this.showData = false;
    if (this.role == 'ROLE_USER') {
      this.filter.username = this.username;
    }
    this.initFilter();
    console.log(this.filter);
         
      this.creditService.getByFilter(this.filter, this.page, this.size)
      .subscribe(data => {
        this.showSpinner = false;
        this.showData = true;
        this.listDocs = data['content'];        
        this.pages = new Array(data['totalPages']);
        this.length = this.pages.length;
        this.totalElements = data['totalElements'];
        this.pages = this.filterService.viewPages(this.length, this.page, this.pages);         
        console.log(this.pages);
      },
        error => {
          console.log(error);
        });
       
  }

  deleteDocument(doc: CreditContract): void {
      this.creditService.deleteById(doc.id).subscribe(data => {
        this.setPage(0);      
        this.toast.showSuccess('', 'Loan contract deleted successfully');
      });
      
    console.log(doc.title);
  }

  deleteAll(): void {    
      this.creditService.deleteAll().subscribe(data => {
        this.getAllDocs();
        this.toast.showSuccess('', 'All loan contracts deleted successfully');
      });
       
    console.log("all");
  }

  docEdit(doc: CreditContract) {
    window.sessionStorage.setItem("docId", doc.id.toString());
  }

  

}
