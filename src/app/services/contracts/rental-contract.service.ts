import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentalContract } from 'src/app/models/contracts/rental-contract.model';
import { FilterObject } from 'src/app/models/filterObj.model';

@Injectable({
  providedIn: 'root'
})
export class RentalContractService {

  private saleUrl = 'http://localhost:8080/rental-contract/';


  public getByFilter(filter: FilterObject, page: number, size: number): Observable<RentalContract[]> {
    return this.http.post<RentalContract[]>(this.saleUrl + "page/get?" + "page=" + page + "&size=" + size, filter);
  }

  constructor(private http: HttpClient){}

  public getById(id: number) {
    return this.http.get<RentalContract>(this.saleUrl + "get/" + id);
  }

  private getLIstByUsername(username: string): Observable<RentalContract[]> {
    return this.http.get<RentalContract[]>(this.saleUrl + "get-username/" + username);
  }

  public getAll(): Observable<RentalContract[]> {
    return this.http.get<RentalContract[]>(this.saleUrl + "get-all");
  }

  public add(username: string, doc: RentalContract) {
    return this.http.post<RentalContract>(this.saleUrl + "add/" + username, doc);
  }

  public update(username: string, doc: RentalContract) {
    return this.http.put<RentalContract>(this.saleUrl + "update/" + username, doc);
  }

  public deleteById(id: number) {
    return this.http.delete(this.saleUrl + "delete/" + id);
  }

  public deleteAll() {
    return this.http.delete(this.saleUrl + "delete-all");
  }
}
