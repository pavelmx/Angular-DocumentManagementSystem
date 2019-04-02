import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileResponse } from './file-response';
import { TokenStorageService } from '../auth/token-storage.service';
import * as fileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private fileUrl = 'http://localhost:8080/file/';


  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  
  public uploadFile(file: File, id: number): Observable<FileResponse> {
    const formdata = new FormData();
    formdata.append('file', file, file.name);
    return this.http.post<FileResponse>(this.fileUrl + "upload/" + id, formdata);
  }

 
  downloadFile(filename: string) {      
    return this.http.get(this.fileUrl + "download/" + filename, {responseType: 'blob' as 'json' });
  }

  deleteFile(filename: string) {     
    return this.http.delete(this.fileUrl + "delete/" + filename);
  }
}