import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { Document } from '../models/document.model';
import { TokenStorageService } from '../auth/token-storage.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { FileService } from '../services/file.service';
import * as fileSaver from 'file-saver';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

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
  uploadResponse = { status: '', message: '', filePath: '' };
  

  constructor(
    private docService: DocumentService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private fileService: FileService,
    private router: Router,
    private toast: ToastService) { }


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
    this.isFailedDownload = false;
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
    if (this.form.dateOfCreation === '') 
      this.form.dateOfCreation = new Date();
    this.docService.updateDocument(this.curUser.id, this.form)
      .subscribe(() => {
        this.router.navigate(['/document']);
        this.isFailed = false;
        this.toast.showSuccess("", "File updated successfully");
      },
        error => {
          console.log(error);
          this.errorMessageUpdate = error.error.message;
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
    this.fileService.uploadFile(this.selectedFile, this.document.id)
      .subscribe(data => {
        this.form.filename = data.fileName;
        this.form.size = data.size;
        this.form.fileType = data.fileType;
        this.form.fileOriginalName = data.fileOriginalName;
        this.uploadResponse = data;
        console.log(data)
        this.initDoc();
        if(this.uploadResponse.message == '100')
        this.toast.showSuccess("", "File uploaded successfully");        
      },
      error => {
        console.log(error)
      this.errorMessage = error.message;
      this.toast.showError("", "File wasn't uploaded");
      });
    this.selectedFile = undefined;
    this.show = false;  
     
  }

  downloadFile() {
    this.toast.showInfo("", "File is downloading...");
    this.fileService.downloadFile(this.form.filename)
      .subscribe(response => {
        this.saveFile(response);        
      },
        error => {
          this.errorMessage = error.message;          
          this.toast.showError("","File can't be download, maybe it was deleted from storage");
          console.log(error);
          this.initDoc();
        });
  }

  saveFile(data: any) {
    const blob = new Blob([data], { type: this.form.fileType });
    fileSaver.saveAs(blob, this.form.filename);
  }

  deleteFile(data: any) {
    this.fileService.deleteFile(data).subscribe(()=>{
      console.log("succes delete");
      this.initDoc();
      this.toast.showSuccess("", "File deleted successfully");
    },
    error=>{
      console.log("unsucces delete");
    });
  }

} 
