import { Component, OnInit } from '@angular/core';
import { fadeFilter, fadeTableItem, fadePaginator, fadeTable, fadeNameTable } from '../../animations/animation';
import { RentalContractService } from 'src/app/services/contracts/rental-contract.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-rental-contract',
  templateUrl: './rental-contract.component.html',
  styleUrls: ['./rental-contract.component.css'],
  animations: [
    fadeFilter, fadeNameTable
  ]
})
export class RentalContractComponent implements OnInit {

  form: any = {};
  curUser: User;
  errorMessage = '';
  isFailed = false;
  isLogin = false;
  today = "";
  

  constructor(
    private docService: RentalContractService,
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
        this.toast.showSuccess("", "Rental contract '" + data.title + "' created successfully");
      },
        error => {
          console.log(error);
          this.toast.showError("", error.error.message)
          //this.errorMessage = error.error.message;
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
    this.form.rentalObject = null;
    this.form.startRental = null;
    this.form.endRental = null;
    this.form.rentalPrice = null;
  }

}
