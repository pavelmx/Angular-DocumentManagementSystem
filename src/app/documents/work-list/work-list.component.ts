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
import { FilterService } from 'src/app/services/filter.service';

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
    private toast: ToastService,
    private filterService: FilterService) { }

  ngOnInit() {
    this.userService.saveKindOfContract("1");
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
    console.log(this.username + " " + this.role)
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
    this.form.fromSalary= null;
    this.form.toSalary= null;
    this.form.position= '';
    this.form.placeOfWork= '';
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
    this.filter.toSalary= this.form.toSalary;
    this.filter.fromSalary= this.form.fromSalary;
    this.filter.position= this.form.position;
    this.filter.placeOfWork= this.form.placeOfWork;
  }

  getAllDocs(): void {

    this.showSpinner = true;
    this.showData = false;
    this.initFilter();
    
    if (this.role == 'ROLE_USER') {
      this.filter.username = this.username;
    }
    
    console.log(this.filter);
         
      this.workService.getByFilter(this.filter, this.page, this.size)
      .subscribe(data => {
        this.showSpinner = false;
        this.showData = true;
        this.listDocs = data['content'];        
        this.pages = new Array(data['totalPages']);
        this.length = this.pages.length;
        this.totalElements = data['totalElements'];
        this.pages = this.filterService.viewPages(this.length, this.page, this.pages);   
        console.log(this.listDocs);
      },
        error => {
          console.log(error);
        });
       
  }

  deleteDocument(doc: WorkContract): void {
      this.workService.deleteById(doc.id).subscribe(data => {
        this.setPage(0);      
        this.toast.showSuccess('', 'Work contract deleted successfully');
      });
      
    console.log(doc.title);
  }

  deleteAll(): void {    
      this.workService.deleteAll().subscribe(data => {
        this.getAllDocs();
        this.toast.showSuccess('', 'All work contracts deleted successfully');
      });
       
    console.log("all");
  }

  docEdit(doc: WorkContract) {
    window.sessionStorage.setItem("docId", doc.id.toString());
  }

  
    
  

}
