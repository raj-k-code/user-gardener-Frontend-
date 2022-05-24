import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
  user: User = new User("", "", "", "", "", "");
  gardener: Gardener = new Gardener("", "", "", "", "", "", "", "", "");
  forgotEmail: any;
  number: any;
  status = false;
  whichApi: any;

  constructor(private toaster: ToastrService, private userService: UserService, private socialService: SocialAuthService, private router: Router, private gardenerService: GardenerService) {
    // this.toaster.success("Login Successfully", "Success")
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        location.reload();
      }
    })
  }

  public login() {
    if (!(sessionStorage.getItem('number') == null || sessionStorage.getItem('number') == undefined)) {
      if (sessionStorage.getItem('number') == "1") {
        this.userService.signIn(this.user).subscribe(data => {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('userId', data.data._id);
          this.toaster.success("Login Successfully", "Success");

          sessionStorage.setItem('userImage', data.data.userImage);
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
      else if (sessionStorage.getItem('number') == "2") {
        this.gardener.gardenerEmail = this.user.userEmail;
        this.gardener.gardenerPassword = this.user.userPassword;

        this.gardenerService.signIn(this.gardener).subscribe(data => {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('userId', data.data._id);
          this.toaster.success("Login Successfully", "Success");

          sessionStorage.setItem('userImage', data.data.gardenerImage);

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
    else {
      this.whichApi = "login"
      this.status = true
    }
  }

  continueToLogin() {
    sessionStorage.setItem("number", this.number);
    if (this.whichApi == "login")
      this.login();
    else if (this.whichApi == "googleSignin")
      this.googleSignin();
    else if (this.whichApi == "forgotPassword")
      this.forgotPassword();
    else if (this.whichApi == "goToSignUp")
      this.goToSignUp();
  }

  googleSignin() {
    if (!(sessionStorage.getItem('number') == null || sessionStorage.getItem('number') == undefined)) {
      this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID)
      this.socialService.authState.subscribe(data => {
        console.log(data.email);

        if (sessionStorage.getItem('number') == "1") {
          this.userService.signInWithGoogle(data.email).subscribe(data => {
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('userId', data.data._id);
            this.toaster.success("Login Successfully", "Success", {
              positionClass: 'toast-top-center'
            });
            sessionStorage.setItem('userImage', data.data.userImage);

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
        else if (sessionStorage.getItem('number') == "2") {
          this.gardenerService.signInWithGoogle(data.email).subscribe(data => {
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('userId', data.data._id);
            this.toaster.success("Login Successfully", "Success");
            sessionStorage.setItem('userImage', data.data.gardenerImage);

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
    else {
      this.whichApi = "googleSignin"
      this.status = true
    }

  }

  public forgotPassword() {
    if (!(sessionStorage.getItem('number') == null || sessionStorage.getItem('number') == undefined)) {
      if (sessionStorage.getItem('number') == "1") {
        this.userService.forgotPassword(this.forgotEmail).subscribe(data => {

          if (data.message) {
            this.toaster.info("NO USER FOUND WITH THIS EMAIL", "SORRY");
          }
          else {
            this.toaster.success("Email Sent Successfully. Check Your Inbox ", "Success");
          }
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
      else if (sessionStorage.getItem('number') == "2") {
        this.gardenerService.forgotPassword(this.forgotEmail).subscribe(data => {

          if (data.message) {
            this.toaster.info("NO USER FOUND WITH THIS EMAIL", "SORRY");
          }
          else {
            this.toaster.success("Email Sent Successfully. Check Your Inbox ", "Success");
          }
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
    else {
      this.whichApi = "forgotPassword"
      this.status = true
    }
  }

  public goToSignUp() {
    if (!(sessionStorage.getItem('number') == null || sessionStorage.getItem('number') == undefined)) {
      this.router.navigate(['signup']);
    }
    else {
      this.whichApi = "goToSignUp"
      this.status = true
    }
  }

}

