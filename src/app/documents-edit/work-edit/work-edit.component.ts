import { Component, OnInit } from '@angular/core';
import { WorkContract } from 'src/app/models/contracts/work-contract.model';
import { User } from 'src/app/models/user.model';
import { WorkContractService } from 'src/app/services/contracts/work-contract.service';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { FileService } from 'src/app/services/file.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { fadeFilter, fadeTableItem, fadePaginator, fadeTable, fadeNameTable } from '../../animations/animation';
import * as fileSaver from 'file-saver';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-work-edit',
  templateUrl: './work-edit.component.html',
  styleUrls: ['./work-edit.component.css'],
  animations: [
    fadeFilter, fadeNameTable
  ]
})
export class WorkEditComponent implements OnInit {

  form: any = {};
  document: WorkContract;
  documentInfo: WorkContract;
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
    private service: WorkContractService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private fileService: FileService,
    private router: Router,
    private toast: ToastService) { }


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
          this.form.kind = this.document.kind;
          this.form.user = this.curUser;
          this.form.filename = this.document.filename;
          
          this.form.startWork = this.document.startWork;
          this.form.position = this.document.position;
          this.form.operationMode = this.document.operationMode;
          this.form.workingHours = this.document.workingHours;
          this.form.holiday = this.document.holiday;
          this.form.salary = this.document.salary;
          this.form.term = this.document.term;
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
        this.toast.showSuccess("", "Work contract updated successfully");
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

        this.fileService.uploadFile(this.selectedFile, this.document.id, "work")
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
    this.fileService.downloadFile(this.form.filename, "work")
      .subscribe(response => {
        this.saveFile(response);
        this.toast.deleteToast(openedToast);
        this.toast.showSuccess("", "File downloaded");
      },
        error => {
          this.errorMessage = error.message;
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
    this.fileService.deleteFile(data, "work")
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
    console.log("save as pdf");
    /*const doc = new jsPDF();
    doc.setFont("Arial");
    if (this.form.expired) {
      doc.setTextColor(212, 3, 3);
      doc.text("Document isn't valid!", 120, 20);
    } else {
      doc.setTextColor(2, 165, 2);
      doc.text("Document valid", 120, 20);
    }
    doc.setTextColor(0, 0, 0);
    doc.text(this.today, 120, 30);//now
    doc.text("Owner: " + this.curUser.username, 120, 40);
    doc.text(doc.splitTextToSize("Customer: " + this.form.customer, 70), 120, 50);
    doc.setFontStyle("bold");
    doc.text(doc.splitTextToSize(this.form.title, 100), 50, 70);
    doc.setFontStyle("");
    doc.text("ID: " + this.form.id, 20, 90);
    doc.text("Document term: " + this.form.contractTerm + " days  (from  " + this.form.dateOfCreation +
      "  to  " +
      this.addDays(new Date(this.form.dateOfCreation), this.form.contractTerm).toISOString().substr(0, 10)
      + ")", 20, 100);
    doc.text("Description: ", 20, 130);
    doc.text(doc.splitTextToSize(this.form.documentDescription, 160), 30, 140);

    doc.save(this.form.title + ".pdf");
    this.toast.showSuccess("", "Save as PDF succesfully");*/
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  cancel() {
    
  }

}
