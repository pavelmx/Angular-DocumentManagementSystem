import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';
import { User } from '../models/user.model';
import { Filter } from '../models/filter.model';
 
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

  public getUsersByFilter(page: number, size: number, filter: Filter): Observable<User[]>{
    return this.http.post<User[]>(this.filterUrl + "users-all?" + "page=" + page + "&size=" + size, filter);
  }

  public updatePass(user: User, pass: string){
    return this.http.put(this.userUrl + "update?pass=" + pass, user);
  }

  public deleteUser(id: number) {
    return this.http.delete(this.userUrl + "delete/"+ id);
  }

  public deleteAll() {
    return this.http.delete(this.userUrl + "deleteall");
  }
  
}