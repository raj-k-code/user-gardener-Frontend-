import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Nursury } from 'src/app/model/nursury';
import { NurseryownerService } from 'src/app/service/nurseryowner.service';

@Component({
  selector: 'app-nursery-signup',
  templateUrl: './nursery-signup.component.html',
  styleUrls: ['./nursery-signup.component.css']
})
export class NurserySignupComponent implements OnInit {
  nursery = new Nursury("", "", "", "", "", "", "", "", "", "");
  passwordType = "password";
  exist = false;
  mobileExist = false;

  constructor(private nurseryService: NurseryownerService, private toaster: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  public SignUp() {
    this.nurseryService.register(this.nursery).subscribe(data => {
      if (!data.message) {
        this.toaster.success("Signup Successfully.Check Your Inbox And Get Verified", "Success");
        this.router.navigate(['/']);
      }

    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 500) {
          this.toaster.error("Internal Server Error", "Error");

        }
        else if (err.status == 400) {
          this.toaster.error("Bad Request", "Error");
        }
      }
    });
  }


  public showPassword() {
    if (this.passwordType === "password") {
      this.passwordType = "text";
    } else {
      this.passwordType = "password";
    }
  }

  checkEmail() {
    this.nurseryService.checkEmail(this.nursery.nurseryOwnerEmail).subscribe(data => {
      if (data.exist == true) {
        this.exist = true
      }
      else {
        this.exist = false
      }
    });
  }

  checkMobile() {
    this.nurseryService.checkMobile(this.nursery.nurseryOwnerMobile).subscribe(data => {
      if (data.exist == true) {
        this.mobileExist = true
      }
      else {
        this.mobileExist = false
      }
    });
  }
}
