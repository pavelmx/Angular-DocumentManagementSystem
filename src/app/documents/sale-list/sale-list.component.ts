import { Component, OnInit } from '@angular/core';
import { fadeFilter, fadeTableItem, fadePaginator, fadeTable, fadeNameTable } from '../../animations/animation';
import { ContractOfSaleService } from 'src/app/services/contracts/contract-of-sale.service';
import { FilterObject } from 'src/app/models/filterObj.model';
import { ContractOfSale } from 'src/app/models/contracts/contract-of-sale.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { FilterService } from 'src/app/services/filter.service';


@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css'],
  animations: [
    fadeFilter, fadeTableItem, fadePaginator, fadeTable, fadeNameTable
  ]
})
export class SaleListComponent implements OnInit {

  form: any = {}
  filter: FilterObject = new FilterObject();
  listDocs: ContractOfSale[] = [];
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
    private saleService: ContractOfSaleService,    
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private toast: ToastService,
    private filterService: FilterService) { }

  ngOnInit() {
    this.userService.saveKindOfContract("4");
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
    this.form.saleObject= null;
    this.form.toSalingPrice= null;
    this.form.toWarrantyPeriod= null;
    this.form.fromSalingPrice= null;
    this.form.fromWarrantyPeriod= null;
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
    this.filter.saleObject= this.form.saleObject;
    this.filter.toSalingPrice= this.form.toSalingPrice;
    this.filter.toWarrantyPeriod= this.form.toWarrantyPeriod;
    this.filter.fromSalingPrice= this.form.fromSalingPrice;
    this.filter.fromWarrantyPeriod= this.form.fromWarrantyPeriod;
  }

  getAllDocs(): void {

    this.showSpinner = true;
    this.showData = false;
    if (this.role == 'ROLE_USER') {
      this.filter.username = this.username;
    }
    this.initFilter();
    console.log(this.filter);
         
      this.saleService.getByFilter(this.filter, this.page, this.size)
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

  deleteDocument(doc: ContractOfSale): void {
      this.saleService.deleteById(doc.id).subscribe(data => {
        this.setPage(0);      
        this.toast.showSuccess('', 'Contracts of sale deleted successfully');
      });
      
    console.log(doc.title);
  }

  deleteAll(): void {    
      this.saleService.deleteAll().subscribe(data => {
        this.getAllDocs();
        this.toast.showSuccess('', 'All contracts of sale deleted successfully');
      });
       
    console.log("all");
  }

  docEdit(doc: ContractOfSale) {
    window.sessionStorage.setItem("docId", doc.id.toString());
  }

 

}
