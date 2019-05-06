import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';
import { User } from '../models/user.model';
import { FilterObject } from '../models/filterObj.model';

const KIND_OF_CONTRACT = 'KIND_OF_CONTRACT';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private userUrl = 'http://localhost:8080/user/';
  
  private today = "";
  private day;
  private month;
  private year;

 
  constructor(private http: HttpClient, private token: TokenStorageService) {}
 
  public getById(id: number) {
    return this.http.get<User>(this.userUrl + "get/" + id);
  }

  public getByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.userUrl + "username/" + username);
  }

  public getAll(): Observable<User[]>{
    return this.http.get<User[]>(this.userUrl + "getall");
  }

  public getUsersByFilter(page: number, size: number, filter: FilterObject): Observable<User[]>{
    return this.http.post<User[]>(this.userUrl + "users-all?" + "page=" + page + "&size=" + size, filter);
  }

  public updateUser(user: User){
    return this.http.put(this.userUrl + "update", user);
  }

  public deleteUser(id: number) {
    return this.http.delete(this.userUrl + "delete/"+ id);
  }

  public deleteAll() {
    return this.http.delete(this.userUrl + "deleteall");
  }

  public initToday() {
    this.day = new Date().getDate();
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
    if (this.day < 10) {
      this.day = '0' + this.day
    }
    if (this.month < 10) {
      this.month = '0' + this.month
    }
    this.today = this.year + "-" + this.month + "-" + this.day;
    return this.today;
  }

  public saveKindOfContract(kind: string) {
    window.sessionStorage.removeItem(KIND_OF_CONTRACT);
    window.sessionStorage.setItem(KIND_OF_CONTRACT, kind);
  }
 
  public getKindOfContract(): string {
    return sessionStorage.getItem(KIND_OF_CONTRACT);
  }
  
}