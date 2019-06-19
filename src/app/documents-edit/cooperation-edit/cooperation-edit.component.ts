import { Component, OnInit } from '@angular/core';
import { CooperationContractService } from 'src/app/services/contracts/cooperation-contract.service';

import * as fileSaver from 'file-saver';
import { Router } from '@angular/router';
import { fadeFilter, fadeTableItem, fadePaginator, fadeTable, fadeNameTable } from '../../animations/animation';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { FileService } from 'src/app/services/file.service';
import { ToastService } from 'src/app/services/toast.service';
import { CooperationContract } from 'src/app/models/contracts/cooperation-contract.model';
import { PDFService } from 'src/app/services/pdf.service';


@Component({
  selector: 'app-cooperation-edit',
  templateUrl: './cooperation-edit.component.html',
  styleUrls: ['./cooperation-edit.component.css'],
  animations: [
    fadeFilter, fadeNameTable
  ]
})
export class CooperationEditComponent implements OnInit {

  form: any = {};
  document: CooperationContract;
  documentInfo: CooperationContract;
  curUser: User;
  curRole: string[];
  isEdit: boolean = false;
  selectedFile: File;
  docId;
  addMode;
  filename: string;
  show: boolean = false;
  isLogin = false;
  errorMessage: string = '';
  errorMessageUpdate: string = '';
  isFailedDownload: boolean = false;
  isFailed = false;
  uploadResponse = { status: '', message: '', filePath: '' };
  today = "";


  constructor(
    private service: CooperationContractService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private fileService: FileService,
    private router: Router,
    private toast: ToastService,
    private pdfService: PDFService) { }


  ngOnInit() {
    this.isLogin = this.tokenStorage.isLogin();
    if (!this.isLogin) {
      this.router.navigate(['/']);
    } else {
      this.today = this.userService.initToday();
      console.log(this.today)
      this.userService.getByUsername(this.tokenStorage.getUsername())
        .subscribe((data: any) => {
          this.curUser = data;

        });

      this.curRole = this.tokenStorage.getAuthorities();
      this.docId = window.sessionStorage.getItem("docId");
      console.log("doc id " + this.docId)
      this.initDoc();
    }
  }

  showUploadPanel() {
    this.show = !this.show;
    this.isFailedDownload = false;
  }


  initDoc() {
    this.isEdit = false;
    this.service.getById(this.docId)
      .subscribe((data: any) => {
        if (data) {
          this.document = data;
          this.form.id = this.document.id;
          if (this.document.dateOfCreation === null) {
            this.form.dateOfCreation = new Date();
          }
          else {
            this.form.dateOfCreation = this.document.dateOfCreation;
          }
          this.form.active = this.document.active;
          this.form.clientAdress = this.document.clientAdress;
          this.form.clientFullName = this.document.clientFullName;
          this.form.lastChange = this.document.lastChange;
          this.form.title = this.document.title;
          this.form.otherInfo = this.document.otherInfo;
          this.form.user = this.curUser;
          this.form.filename = this.document.filename;
          this.form.clientResponsibility = this.document.clientResponsibility;
          this.form.creatorResponsibility = this.document.creatorResponsibility;
          this.form.kindOfActivity = this.document.kindOfActivity;
          this.form.term = this.document.term;
          this.form.terminationConditions = this.document.terminationConditions;
        }
      });
  }

  updateDoc() {
    if (this.form.dateOfCreation === '')
      this.form.dateOfCreation = new Date();
    this.service.update(this.curUser.username, this.form)
      .subscribe(() => {
        this.initDoc();
        this.isFailed = false;
        this.toast.showSuccess("", "Cooperation contract updated successfully");
      },
        error => {
          console.log(error);
          //this.errorMessageUpdate = error.error.message;
          this.toast.showError("", error.error.message);
          this.isFailed = true;
        });
    this.isEdit = false;
  }

  change() {
    this.isFailedDownload = false;
    this.isEdit = true;
  }

  selectFile(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile.name);
  }

  uploadFile() {
    if (this.form.filename != null) {
      this.deleteFile(this.form.filename);
    }

    if (this.selectedFile.size > 51200000) {// 50 MB
      this.toast.showError("", "File wasn't uploaded, because file size exceeded the limit of 50mb");
      this.selectedFile = undefined;
    } else {

      this.fileService.uploadFile(this.selectedFile, this.document.id, "cooperation")
        .subscribe(data => {
          this.form.filename = data.filename;
          this.uploadResponse = data;
          this.initDoc();
          if (this.uploadResponse.message == '100') {
            this.toast.showSuccess("", "File uploaded successfully");
            console.log("status " + this.uploadResponse.status)
            console.log("message " + this.uploadResponse.message)
            console.log("filePath " + this.uploadResponse.filePath)
          }
        },
          error => {
            console.log(error)
            //this.errorMessage = error.message;
            this.toast.showError("", error.message);
          });
      this.selectedFile = undefined;
      this.show = false;
    }
  }

  downloadFile() {
    var openedToast = null;
    openedToast = this.toast.showInfo("", "File is downloading...");
    this.fileService.downloadFile(this.form.filename, "cooperation")
      .subscribe(response => {
        this.saveFile(response);
        this.toast.deleteToast(openedToast);
        this.toast.showSuccess("", "File downloaded");
      },
        error => {
          //this.errorMessage = error.message;
          this.toast.deleteToast(openedToast);
          this.toast.showError("", "File can't be download, maybe it was deleted from storage");
          console.log(error);
          this.initDoc();
        });
  }

  saveFile(data: any) {
    const blob = new Blob([data], { type: this.form.fileType });
    fileSaver.saveAs(blob, this.form.filename);
  }

  deleteFile(data: any) {
    this.fileService.deleteFile(data, "cooperation")
      .subscribe(() => {
        console.log("success delete");
        this.initDoc();
        //this.toast.showSuccess("", "File deleted successfully");
      },
        error => {
          console.log("unsucces delete");
        });
  }

  saveAsPDF() {
    console.log("88 " + this.curUser.adress)
    if (this.curUser.adress == null || this.curUser.adress == '') {
      this.toast.showWarning("", "To generate a PDF document, please go to your account and fill in the address");
    }
    else {
      this.pdfService.saveAsPDFCooperation(this.form.kindOfActivity, this.form.dateOfCreation,
        this.form.clientResponsibility, this.form.creatorResponsibility, this.form.term,
        this.form.terminationConditions, this.form.title, this.form.clientFullName, this.form.clientAdress,
        this.curUser.name, this.curUser.adress, this.form.otherInfo);
      this.toast.showSuccess("", "Save as PDF succesfully");
    }
  }


}
