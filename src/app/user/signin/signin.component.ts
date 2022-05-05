import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user: User = new User("", "", "", "", "");

  constructor(private toaster: ToastrService, private userService: UserService, private socialService: SocialAuthService) {
    // this.toaster.success("Login Successfully", "Success")
  }

  ngOnInit(): void {
  }

  public login() {
    this.userService.signIn(this.user).subscribe(data => {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('userId', data.data._id);
      this.toaster.success("Login Successfully", "Success");

    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
          this.toaster.error("Invalid User", "Error");
        }
        else if (err.status == 500) {
          this.toaster.error("Internal Server Error", "Error");

        }
        else if (err.status == 400) {
          this.toaster.error("Bad Request", "Error");

        }
      }
    });
  }

  googleSignin() {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID)
    this.socialService.authState.subscribe(data => {
      console.log(data.email);

      this.userService.signInWithGoogle(data.email).subscribe(data => {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.data._id);
        this.toaster.success("Login Successfully", "Success");

      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            this.toaster.error("Invalid User", "Error");
          }
          else if (err.status == 500) {
            this.toaster.error("Internal Server Error", "Error");

          }
          else if (err.status == 400) {
            this.toaster.error("Bad Request", "Error");

          }
        }
      });
    })
  }
}
