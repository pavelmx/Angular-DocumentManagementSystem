import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  listUsers: User[] = [];
  private role: string;
  isLogin = false;
  errorMessage = ';'


  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit() {
    this.role = this.tokenStorage.getAuthorities()[0];
    this.getAllUsers();
    this.isLogin = this.tokenStorage.isLogin();
    if (!this.tokenStorage.isLogin()) {
      this.router.navigate(['/login']);
    }
  }

  getAllUsers() {
    this.userService.getAll()
      .subscribe((data: any) => {
        this.listUsers = data;
      },
      error =>{
        this.errorMessage = error.error.message;
      });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(data => {
      this.getAllUsers();
    });
    console.log(user.id);
  }

  deleteAll(): void {
    this.userService.deleteAll().subscribe(data => {
      this.getAllUsers();
    });
  }


}
