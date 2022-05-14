import { HttpErrorResponse } from '@angular/common/http';
import { ExternalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Gardener } from 'src/app/model/gardener';
import { User } from 'src/app/model/user';
import { GardenerService } from 'src/app/service/gardener.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  userData = new User("", "", "", "", "", "");
  gardenerData?: Gardener;
  id: any = sessionStorage.getItem('userId');

  number = sessionStorage.getItem('number');

  name: any;
  email: any;
  mobile: any;
  address: any;
  image: any;
  experience: any;
  gardenerRating: any;
  showImage: any;


  constructor(private userService: UserService, private toaster: ToastrService, private gardenerService: GardenerService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('number') == "1") {
      this.userService.viewProfile().subscribe(data => {
        if (data.userEmail) {
          this.name = data.userName;
          this.email = data.userEmail;
          this.mobile = data.userMobile;
          this.address = data.userAddress;
          this.image = data.userImage
          this.showImage = data.userImage

          console.log(this.userData + "============");
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
    else if (sessionStorage.getItem('number') == "2") {
      this.gardenerService.viewProfile().subscribe(data => {
        if (data.gardenerEmail) {
          this.gardenerData = data;

          this.name = data.gardenerName;
          this.email = data.gardenerEmail;
          this.mobile = data.gardenerMobile;
          this.address = data.gardenerAddress;
          this.image = data.gardenerImage;
          this.experience = data.gardenerExperience;
          this.showImage = data.gardenerImage

          console.log(this.gardenerData + "============");
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
  }

  public onSelect(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.showImage = event.target.result;
      };
      this.image = e.target.files[0];
      // console.log(this.showImage + '              Image');
    }
  }

  public updateProfile() {
    if (sessionStorage.getItem('number') == "1") {
      const formData = new FormData();
      formData.append('userName', this.name);
      formData.append('userEmail', this.email);
      formData.append('userMobile', this.mobile);
      formData.append('userAddress', this.address);
      formData.append('userId', this.id);
      formData.append('userImage', this.image);

      this.userService.updateProfile(formData).subscribe(data => {
        if (data.success) {
          this.toaster.success("Profile Updated", "Success");
          this.ngOnInit();
        }
        else {
          this.toaster.error("Not Upadated");
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
    else if (sessionStorage.getItem('number') == "2") {
      const formData = new FormData();
      formData.append('gardenerName', this.name);
      formData.append('gardenerEmail', this.email);
      formData.append('gardenerMobile', this.mobile);
      formData.append('gardenerAddress', this.address);
      formData.append('gardenerId', this.id);
      formData.append('gardenerExperience', this.experience);
      formData.append('gardenerImage', this.image);


      this.gardenerService.updateProfile(formData).subscribe(data => {
        if (data.success) {
          this.toaster.success("Profile Updated Successfully", "Success");
          this.ngOnInit();
        }
        else {
          this.toaster.error("Not Upadated");
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
  }

}
