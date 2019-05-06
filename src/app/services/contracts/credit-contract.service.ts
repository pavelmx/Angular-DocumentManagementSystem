import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreditContract } from 'src/app/models/contracts/credit-contract.model';
import { Observable } from 'rxjs';
import { FilterObject } from 'src/app/models/filterObj.model';

@Injectable({
  providedIn: 'root'
})
export class CreditContractService {

  private saleUrl = 'http://localhost:8080/credit-contract/';


  constructor(private http: HttpClient){}

  public getByFilter(filter: FilterObject, page: number, size: number): Observable<CreditContract[]> {
    return this.http.post<CreditContract[]>(this.saleUrl + "page/get?" + "page=" + page + "&size=" + size, filter);
  }


  public getById(id: number) {
    return this.http.get<CreditContract>(this.saleUrl + "get/" + id);
  }

  private getLIstByUsername(username: string): Observable<CreditContract[]> {
    return this.http.get<CreditContract[]>(this.saleUrl + "get-username/" + username);
  }

  public getAll(): Observable<CreditContract[]> {
    return this.http.get<CreditContract[]>(this.saleUrl + "get-all");
  }

  public add(username: string, doc: CreditContract) {
    return this.http.post<CreditContract>(this.saleUrl + "add/" + username, doc);
  }

  public update(username: string, doc: CreditContract) {
    return this.http.put<CreditContract>(this.saleUrl + "update/" + username, doc);
  }

  public deleteById(id: number) {
    return this.http.delete(this.saleUrl + "delete/" + id);
  }

  public deleteAll() {
    return this.http.delete(this.saleUrl + "delete-all");
  }
}
