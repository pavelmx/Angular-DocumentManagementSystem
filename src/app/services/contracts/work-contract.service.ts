import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkContract } from 'src/app/models/contracts/work-contract.model';
import { FilterObject } from 'src/app/models/filterObj.model';

@Injectable({
  providedIn: 'root'
})
export class WorkContractService {

  private saleUrl = 'http://localhost:8080/work-contract/';


  constructor(private http: HttpClient){}


  public getByFilter(filter: FilterObject, page: number, size: number): Observable<WorkContract[]> {
    return this.http.post<WorkContract[]>(this.saleUrl + "page/get?" + "page=" + page + "&size=" + size, filter);
  }


  public getById(id: number) {
    return this.http.get<WorkContract>(this.saleUrl + "get/" + id);
  }

  private getLIstByUsername(username: string): Observable<WorkContract[]> {
    return this.http.get<WorkContract[]>(this.saleUrl + "get-username/" + username);
  }

  public getAll(): Observable<WorkContract[]> {
    return this.http.get<WorkContract[]>(this.saleUrl + "get-all");
  }

  public add(username: string, doc: WorkContract) {
    return this.http.post<WorkContract>(this.saleUrl + "add/" + username, doc);
  }

  public update(username: string, doc: WorkContract) {
    return this.http.put<WorkContract>(this.saleUrl + "update/" + username, doc);
  }

  public deleteById(id: number) {
    return this.http.delete(this.saleUrl + "delete/" + id);
  }

  public deleteAll() {
    return this.http.delete(this.saleUrl + "delete-all");
  }
}
