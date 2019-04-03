import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';

import { Document } from '../models/document.model';
import { HttpClient } from '@angular/common/http';
import { Filter } from '../models/filter.model';



@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private documentUrl = 'http://localhost:8080/document/';
  private docFilterUrl = 'http://localhost:8080/filter/';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  public getById(id: number) {
    return this.http.get<Document>(this.documentUrl + "get/" + id);
  }

  private getDocsByUser(username: string, page: number, size: number): Observable<Document[]> {
    return this.http.get<Document[]>(this.documentUrl + "usernamepage/" + username  + "?page=" + page + "&size=" + size);
  }

  private getDocsByAdmin(page: number, size: number): Observable<Document[]>{
    return this.http.get<Document[]>(this.documentUrl + "getallpage" + "?page=" + page + "&size=" + size);
  }


  public getDocsByFilter(filter: Filter, page: number, size: number): Observable<Document[]> {
    return this.http.post<Document[]>(this.docFilterUrl + "documents-all?" + "page=" + page + "&size=" + size, filter);
  }

  public getAll(page: number, size: number): Observable<Document[]> {
    if(this.tokenStorage.getAuthorities()[0] === 'ROLE_ADMIN'){
      return this.getDocsByAdmin(page, size);
    }else{
      return this.getDocsByUser(this.tokenStorage.getUsername(), page, size);
    }   
  }

  public addDocument(id: number, doc: Document) {
    return this.http.post<Document>(this.documentUrl + "add/" + id, doc);
  }

  public updateDocument(id: number, doc: Document) {
    return this.http.put<Document>(this.documentUrl + "update/" + id, doc);
  }

  public deleteDocument(id: number) {
    return this.http.delete(this.documentUrl + "delete/" + id);
  }

  public deleteAll() {
    return this.http.delete(this.documentUrl + "deleteall");
  }

}