import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContractOfSale } from 'src/app/models/contracts/contract-of-sale.model';
import { Observable } from 'rxjs';
import { FilterObject } from 'src/app/models/filterObj.model';

@Injectable({
  providedIn: 'root'
})
export class ContractOfSaleService {

  private saleUrl = 'http://localhost:8080/sale-contract/';


  constructor(private http: HttpClient){}


  public getByFilter(filter: FilterObject, page: number, size: number): Observable<ContractOfSale[]> {
    return this.http.post<ContractOfSale[]>(this.saleUrl + "page/get?" + "page=" + page + "&size=" + size, filter);
  }




  public getById(id: number) {
    return this.http.get<ContractOfSale>(this.saleUrl + "get/" + id);
  }

  private getListByUsername(username: string): Observable<ContractOfSale[]> {
    return this.http.get<ContractOfSale[]>(this.saleUrl + "get-username/" + username);
  }

  public getAll(): Observable<ContractOfSale[]> {
    return this.http.get<ContractOfSale[]>(this.saleUrl + "get-all");
  }

  public add(username: string, doc: ContractOfSale) {
    return this.http.post<ContractOfSale>(this.saleUrl + "add/" + username, doc);
  }

  public update(username: string, doc: ContractOfSale) {
    return this.http.put<ContractOfSale>(this.saleUrl + "update/" + username, doc);
  }

  public deleteById(id: number) {
    return this.http.delete(this.saleUrl + "delete/" + id);
  }

  public deleteAll() {
    return this.http.delete(this.saleUrl + "delete-all");
  }
}
 