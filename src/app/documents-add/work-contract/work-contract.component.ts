import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { WorkContractService } from 'src/app/services/contracts/work-contract.service';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { CatalogOfOperationMode } from 'src/app/models/catalog-of-operation-mode.model';
import { CatalogOfOperationModeService } from 'src/app/services/catalog-of-operation-mode.service';
import { fadeFilter, fadeTableItem, fadePaginator, fadeTable, fadeNameTable } from '../../animations/animation';
import { WorkContract } from 'src/app/models/contracts/work-contract.model';


@Component({
  selector: 'app-work-contract',
  templateUrl: './work-contract.component.html',
  styleUrls: ['./work-contract.component.css'],
  animations: [
    fadeFilter, fadeNameTable
  ]
})
export class WorkContractComponent implements OnInit {

  form: any={};  
  curUser: User;
  errorMessage = '';
  isFailed = false;
  isLogin = false;
  today = "";
  listOfMode: CatalogOfOperationMode[] = [];
  

  constructor(
    private catalogService: CatalogOfOperationModeService,
    private docService: WorkContractService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit() {
    if (!this.tokenStorage.isLogin()) {
      this.router.navigate(['/']);
    } else {
      this.catalogService.getListOfMode()
        .subscribe(data => {
          this.listOfMode = data;
          console.log("list modes" + this.listOfMode.toString());
        },
          error => {
            console.log(error);
          });
      this.today = this.userService.initToday();
      console.log(this.today);
      this.addNewDoc();
      this.isLogin = this.tokenStorage.isLogin();
    }
  }

  addDoc() {
    this.docService.add(this.tokenStorage.getUsername(), this.form)
      .subscribe(data => {
        this.userService.saveKindOfContract("1");
        this.isFailed = false;
        this.toast.showSuccess("", "Work contract '" + data.title + "' created successfully");
        this.router.navigate(['/documents-list']);
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
    this.form.startWork = null;
    this.form.position = null;   
    this.form.workingHours = null;
    this.form.holiday = null;
    this.form.salary = null;   
    this.form.operationMode = null; 
    this.form.term = null;
    this.form.placeOfWork = null;
  }

}
