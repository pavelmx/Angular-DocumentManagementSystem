import { Component, OnInit } from '@angular/core';
import { fadeFilter, fadeTableItem, fadePaginator, fadeTable, fadeNameTable } from '../../animations/animation';
import { CreditContractService } from 'src/app/services/contracts/credit-contract.service';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-credit-contract',
  templateUrl: './credit-contract.component.html',
  styleUrls: ['./credit-contract.component.css'],
  animations: [
    fadeFilter, fadeNameTable
  ]
})
export class CreditContractComponent implements OnInit {

  form: any = {};
  curUser: User;
  errorMessage = '';
  isFailed = false;
  isLogin = false;
  today = "";

  constructor(
    private docService: CreditContractService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private toast: ToastService
  ) { }

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
    this.form.active = null;
    this.form.clientAdress = null;
    this.form.clientFullName = null;
    this.form.lastChange = null;
    this.form.title = null;
    this.form.otherInfo = null;
    this.form.kind = null;
    this.form.creditAmount = null;
    this.form.annualInterest = null;
    this.form.term = null;
  }

}
