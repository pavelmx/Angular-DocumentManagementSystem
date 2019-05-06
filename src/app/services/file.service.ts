import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileResponse } from '../file/file-response';
import { TokenStorageService } from '../auth/token-storage.service';
import { map } from  'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  private fileUrl = 'http://localhost:8080/file/';


  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  
  public uploadFile(file: File, id: number, kindOfContract: string): Observable<any> {
    const formdata = new FormData();
    formdata.append('file', file, file.name);
    return this.http.post<any>(this.fileUrl + "upload/" + id + "?kind=" + kindOfContract, formdata, {reportProgress: true, observe: 'events'})
    .pipe(
      map((event) => {
        switch (event.type) {  
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return { status: 'progress', message: progress };  
          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
      );
  }

 
  downloadFile(filename: string, kindOfContract: string) {      
    return this.http.get(this.fileUrl + "download/" + filename + "?kind=" + kindOfContract, {responseType: 'blob' as 'json' });
  }

  deleteFile(filename: string, kindOfContract: string) {     
    return this.http.delete(this.fileUrl + "delete/" + filename + "?kind=" + kindOfContract);
  }

   getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return 'Uploading file "${file.name}" of size ${file.size}.';
  
      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return 'File "${file.name}" is ${percentDone}% uploaded.';
  
      case HttpEventType.Response:
        return 'File "${file.name}" was completely uploaded!';
  
      default:
        return 'File "${file.name}" surprising upload event: ${event.type}.';
    }
  }
}