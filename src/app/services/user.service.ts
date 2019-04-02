import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';
import { tokenKey } from '@angular/core/src/view';
import { User } from '../models/user.model';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private userUrl = 'http://localhost:8080/user/';
  private filterUrl = 'http://localhost:8080/filter/';
 
 
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

  public getUsersByFilter(page: number, size: number, sortField: string, sortOrder: string,
    name: string, username: string, email: string, activationCode: string): Observable<User[]>{
    return this.http.get<User[]>(this.filterUrl + "users-all?" + "page=" + page + "&size=" + size
    + "&name=" + name + "&username=" + username + "&email=" + email + "&sortField=" + sortField 
    +  "&sortOrder=" + sortOrder + "&activationCode=" + activationCode);
  }

  public updateUser(user: User){
    return this.http.put<User>(this.userUrl + "update", user);
  }

  public deleteUser(id: number) {
    return this.http.delete(this.userUrl + "delete/"+ id);
  }

  public deleteAll() {
    return this.http.delete(this.userUrl + "deleteall");
  }
  
}