import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogOfOperationMode } from 'src/app/models/catalog-of-operation-mode.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogOfOperationModeService {

  private saleUrl = 'http://localhost:8080/catalog/';


  constructor(private http: HttpClient){}

  public getListOfMode(): Observable<CatalogOfOperationMode[]> {
    return this.http.get<CatalogOfOperationMode[]>(this.saleUrl + "all");
  }
}