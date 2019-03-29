import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   roles: string[];
   authority: string;
   username: string; 
   token: any; 
  

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }
 
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.token = this.tokenStorage.getToken();
      this.username = this.tokenStorage.getUsername();
      this.roles = this.tokenStorage.getAuthorities();
        if (this.roles[0] === 'ROLE_ADMIN') {
          this.authority = 'admin';      
        }else{
           this.authority = 'user';}
        
    } 
    console.log("kukukukuukukkuku");
  }

 
  logout() {    
    this.tokenStorage.signOut();
    window.location.reload();        
  }

  
}
