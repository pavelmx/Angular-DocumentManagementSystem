import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CooperationContract } from 'src/app/models/contracts/cooperation-contract.model';
import { Observable } from 'rxjs';
import { FilterObject } from 'src/app/models/filterObj.model';

@Injectable({
  providedIn: 'root'
})
export class CooperationContractService {

  private saleUrl = 'http://localhost:8080/cooperation-contract/';


  constructor(private http: HttpClient){}

  public getByFilter(filter: FilterObject, page: number, size: number): Observable<CooperationContract[]> {
    return this.http.post<CooperationContract[]>(this.saleUrl + "page/get?" + "page=" + page + "&size=" + size, filter);
  }


  public getById(id: number) {
    return this.http.get<CooperationContract>(this.saleUrl + "get/" + id);
  }

  private getLIstByUsername(username: string): Observable<CooperationContract[]> {
    return this.http.get<CooperationContract[]>(this.saleUrl + "get-username/" + username);
  }

  public getAll(): Observable<CooperationContract[]> {
    return this.http.get<CooperationContract[]>(this.saleUrl + "get-all");
  }

  public add(username: string, doc: CooperationContract) {
    return this.http.post<CooperationContract>(this.saleUrl + "add/" + username, doc);
  }

  public update(username: string, doc: CooperationContract) {
    return this.http.put<CooperationContract>(this.saleUrl + "update/" + username, doc);
  }

  public deleteById(id: number) {
    return this.http.delete(this.saleUrl + "delete/" + id);
  }

  public deleteAll() {
    return this.http.delete(this.saleUrl + "delete-all");
  }
}
