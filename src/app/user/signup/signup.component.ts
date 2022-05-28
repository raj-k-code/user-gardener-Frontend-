import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gardener } from 'src/app/model/gardener';
import { User } from 'src/app/model/user';
import { GardenerService } from 'src/app/service/gardener.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = new User("", "", "", "", "", "");
  gardener = new Gardener("", "", "", "", "", "", "", "", "");
  passwordType = "password"
  exist = false;
  mobileExist = false;

  constructor(private userService: UserService, private toaster: ToastrService, private router: Router, private gardenerService: GardenerService) { }

  ngOnInit(): void {
    // location.reload();
  }

  gardenerOrUser(): boolean {
    if (sessionStorage.getItem('number') == '1')
      return true
    else
      return false
  }

  public SignUp() {
    if (sessionStorage.getItem('number') == "1") {
      this.user.userName = this.gardener.gardenerName;
      this.user.userEmail = this.gardener.gardenerEmail;
      this.user.userPassword = this.gardener.gardenerPassword;
      this.user.userMobile = this.gardener.gardenerMobile;
      this.user.userAddress = this.gardener.gardenerAddress;
      console.log(this.user);
      this.userService.signUp(this.user).subscribe(data => {

        if (!data.message) {
          this.toaster.success("Signup Successfully", "Success");
          this.router.navigate(['signin']);
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
    else {
      console.log(this.gardener);

      this.gardenerService.signUp(this.gardener).subscribe(data => {
        console.log(data);

        if (!data.message) {
          this.toaster.success("Signup Successfully", "Success");
          this.router.navigate(['signin']);
        }

      }, err => {
        if (err instanceof HttpErrorResponse) {
          console.log(err);
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

  goToSignIn() {
    this.router.navigate(['signin']);
  }


  public showPassword() {
    if (this.passwordType === "password") {
      this.passwordType = "text";
    } else {
      this.passwordType = "password";
    }
  }

  checkEmail() {
    if (sessionStorage.getItem('number') == "1") {
      this.userService.checkEmail(this.gardener.gardenerEmail).subscribe(data => {
        if (data.exist == true) {
          this.exist = true
        }
        else {
          this.exist = false
        }
      });
    }
    else if (sessionStorage.getItem('number') == "2") {
      this.gardenerService.checkEmail(this.gardener.gardenerEmail).subscribe(data => {
        if (data.exist == true) {
          this.exist = true
        }
        else {
          this.exist = false
        }
      });
    }
  }

  checkMobile() {
    if (sessionStorage.getItem('number') == "1") {
      this.userService.checkMobile(this.gardener.gardenerMobile).subscribe(data => {
        if (data.exist == true) {
          this.mobileExist = true
        }
        else {
          this.mobileExist = false
        }
      });
    }
    else if (sessionStorage.getItem('number') == "2") {
      this.gardenerService.checkMobile(this.gardener.gardenerMobile).subscribe(data => {
        if (data.exist == true) {
          this.mobileExist = true
        }
        else {
          this.mobileExist = false
        }
      });
    }
  }
}
