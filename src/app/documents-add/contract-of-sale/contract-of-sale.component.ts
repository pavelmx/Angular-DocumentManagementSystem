import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { User } from 'src/app/models/user.model';
import { ContractOfSaleService } from 'src/app/services/contracts/contract-of-sale.service';
import { fadeFilter, fadeTableItem, fadePaginator, fadeTable, fadeNameTable } from '../../animations/animation';


@Component({
  selector: 'app-contract-of-sale',
  templateUrl: './contract-of-sale.component.html',
  styleUrls: ['./contract-of-sale.component.css'],
  animations: [
    fadeFilter, fadeNameTable
  ]
})
export class ContractOfSaleComponent implements OnInit {

  form: any = {};
  curUser: User;
  errorMessage = '';
  isFailed = false;
  isLogin = false;
  today = "";

  constructor(
    private docService: ContractOfSaleService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private toast: ToastService) { }

  ngOnInit() {
    if (!this.tokenStorage.isLogin()) {
      this.router.navigate(['/']);
    } else {
      this.today = this.userService.initToday();
      this.addNewDoc();      
      this.isLogin = this.tokenStorage.isLogin();      
    }
  }

  addDoc() {
    console.log(this.tokenStorage.getUsername())
    console.log(this.form)
    this.docService.add(this.tokenStorage.getUsername(), this.form)
      .subscribe(data => {
        this.userService.saveKindOfContract("4");
        this.isFailed = false;
        this.router.navigate(['/documents-list']);
        this.toast.showSuccess("", "Contract of sale '" + data.title + "' created successfully");
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
    this.form.active = null;
    this.form.clientAdress = null;
    this.form.clientFullName = null;
    this.form.lastChange = null;
    this.form.title = null;
    this.form.otherInfo = null;
    this.form.kind = null;
    this.form.saleObject = null;
    this.form.salingPrice = null;
    this.form.warrantyPeriod = null;
  }

}
