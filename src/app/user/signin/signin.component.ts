import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { Gardener } from 'src/app/model/gardener';
import { User } from 'src/app/model/user';
import { GardenerService } from 'src/app/service/gardener.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user: User = new User("", "", "", "", "");
  gardener: Gardener = new Gardener("", "", "", "", "", "", "",);

  constructor(private toaster: ToastrService, private userService: UserService, private socialService: SocialAuthService, private router: Router, private gardenerService: GardenerService) {
    // this.toaster.success("Login Successfully", "Success")
  }

  ngOnInit(): void {
  }

  public login() {
    if (sessionStorage.getItem('number') == "1") {
      this.userService.signIn(this.user).subscribe(data => {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.data._id);
        this.toaster.success("Login Successfully", "Success");
        // sessionStorage.removeItem('number');
        this.router.navigate(['/']);

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
    else {
      this.gardener.gardenerEmail = this.user.userEmail;
      this.gardener.gardenerPassword = this.user.userPassword;

      this.gardenerService.signIn(this.gardener).subscribe(data => {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.data._id);
        this.toaster.success("Login Successfully", "Success");
        // sessionStorage.removeItem('number');
        this.router.navigate(['/']);

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
  }

  googleSignin() {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID)
    this.socialService.authState.subscribe(data => {
      console.log(data.email);

      if (sessionStorage.getItem('number') == "1") {
        this.userService.signInWithGoogle(data.email).subscribe(data => {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('userId', data.data._id);
          this.toaster.success("Login Successfully", "Success");
          // sessionStorage.removeItem('number');
          this.router.navigate(['/']);

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
      else {
        this.gardenerService.signInWithGoogle(data.email).subscribe(data => {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('userId', data.data._id);
          this.toaster.success("Login Successfully", "Success");
          // sessionStorage.removeItem('number');
          this.router.navigate(['/']);

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

    })
  }
}

