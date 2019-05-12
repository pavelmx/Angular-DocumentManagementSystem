import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { User } from 'src/app/models/user.model';
import { CooperationContractService } from 'src/app/services/contracts/cooperation-contract.service';
import { fadeFilter, fadeTableItem, fadePaginator, fadeTable, fadeNameTable } from '../../animations/animation';


@Component({
  selector: 'app-cooperation-contract',
  templateUrl: './cooperation-contract.component.html',
  styleUrls: ['./cooperation-contract.component.css'],
  animations: [
    fadeFilter, fadeNameTable
  ]
})
export class CooperationContractComponent implements OnInit {

  form: any = {};
  curUser: User;
  errorMessage = '';
  isFailed = false;
  isLogin = false;
  today = "";

  constructor(
    private docService: CooperationContractService,
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
        this.userService.saveKindOfContract("3");
        this.isFailed = false;
        this.router.navigate(['/documents-list']);        
        this.toast.showSuccess("", "Cooperation contract '" + data.title + "' created successfully");
      },
        error => {
          console.log(error);
          this.toast.showError("", error.error.message)
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
    this.form.clientResponsibility = null;
    this.form.creatorResponsibility = null;    
    this.form.kindOfActivity = null;   
    this.form.term = null;
    this.form.terminationConditions = null;
  }

}
