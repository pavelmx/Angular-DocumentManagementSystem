import { Component, OnInit } from '@angular/core';
 
import { AuthService } from '../auth/auth.service';
import { SignUp} from '../auth/signup';
import { ToastService } from '../services/toast.service';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUp;
  isSignedUp = false;
  errorMessage = '';
  load = false;

  constructor(
    private authService: AuthService,
    private toast: ToastService) { }
 
  ngOnInit() { }
 
  onSubmit() {
    this.load = true;

    var openedToast = null;
    openedToast = this.toast.showInfo("", "Registration process...");
     
    this.signupInfo = new SignUp(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password);
 
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.load = false;
     },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignedUp = false;
        this.load = false;
        this.toast.deleteToast(openedToast);
        this.toast.showError("", "Error registration");
      }
    );
  }
}
