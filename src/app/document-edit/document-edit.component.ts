import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document/document.service';
import { Document } from '../document/document.model';
import { TokenStorageService } from '../auth/token-storage.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { FileService } from '../file/file.service';
import * as fileSaver from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  form: any = {};
  document: Document;
  documentInfo: Document;
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


  constructor(
    private docService: DocumentService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private fileService: FileService,
    private router: Router) { }


  ngOnInit() {
    this.userService.getByUsername(this.tokenStorage.getUsername())
      .subscribe((data: any) => {
        this.curUser = data;
      });

    this.curRole = this.tokenStorage.getAuthorities();
    this.docId = window.sessionStorage.getItem("docId");
    this.initDoc();

    this.isLogin = this.tokenStorage.isLogin();
    if (!this.tokenStorage.isLogin()) {
      this.router.navigate(['/login']);
    }
  }

  showUploadPanel() {
    this.show = !this.show;
  }

  initDoc() {
    this.isEdit = false;
    this.docService.getById(this.docId)
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
          this.form.title = this.document.title;
          this.form.user = this.curUser;
          this.form.documentDescription = this.document.documentDescription;
          this.form.customer = this.document.customer;
          this.form.filename = this.document.filename;
          this.form.expired = this.document.expired;
          this.form.contractTerm = this.document.contractTerm;
        }
      });
  }

  updateDoc() {    
    this.docService.updateDocument(this.curUser.id, this.form)
      .subscribe(() => {
        this.router.navigate(['/document']);
        this.isFailed = false;
      },
        error => {
          console.log(error);
          this.errorMessageUpdate = error.error.message;
          this.isFailed = true;
        });
    this.isEdit = false;
  }

  change() {
    this.isEdit = true;
  }

  selectFile(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile.name);
  }

  uploadFile() {
    this.fileService.uploadFile(this.selectedFile, this.document.id)
      .subscribe(data => {
        this.form.filename = data.fileName;
        this.form.size = data.size;
        this.form.fileType = data.fileType;
        this.form.fileOriginalName = data.fileOriginalName;
      });
    this.selectedFile = undefined;
    this.show = false;
  }

  downloadFile() {
    this.fileService.downloadFile(this.form.filename)
      .subscribe(response => {
        this.saveFile(response);
        this.isFailedDownload = false;
      },
        error => {
          this.errorMessage = error.message;
          this.isFailedDownload = true;
          console.log(error);
        });
  }

  saveFile(data: any) {
    const blob = new Blob([data], { type: this.form.fileType });
    fileSaver.saveAs(blob, this.form.filename);
  }


} 
