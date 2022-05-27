import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Gardener } from 'src/app/model/gardener';
import { GardenerService } from 'src/app/service/gardener.service';

@Component({
  selector: 'app-gardener-profile',
  templateUrl: './gardener-profile.component.html',
  styleUrls: ['./gardener-profile.component.css']
})
export class GardenerProfileComponent implements OnInit {
  gardenerData = new Gardener("", "", "", "", "", "", "", "", "");
  GardenerId: any;
  starRating: any;
  addStar: any = 0;
  newReview: any;
  oldRate: any



  // name: any;
  // email: any;
  // mobile: any;
  // address: any;
  // image: any;
  // experience: any;
  gardenerRating: any;
  // showImage: any;


  constructor(private spinner: NgxSpinnerService, private toaster: ToastrService, private gardenerService: GardenerService, private activate: ActivatedRoute, private router: Router) {
    this.GardenerId = activate.snapshot.paramMap.get('id');
    spinner.show();
  }

  ngOnInit(): void {
    this.gardenerService.viewProfile(this.GardenerId).subscribe(data => {
      if (data.gardenerEmail) {
        this.gardenerData = data;
        var rmIndex;

        this.gardenerRating = this.gardenerData.gardenerRating
        let total = 0;
        for (let rate in this.gardenerRating) {
          total += this.gardenerRating[rate].rate;
          console.log(total + "========inside loop");
          if (this.gardenerRating[rate].userId._id == sessionStorage.getItem('userId')) {
            this.oldRate = this.gardenerRating[rate];
            rmIndex = rate;
          }
        }

        if (this.gardenerRating.length == 0 && this.oldRate) {
          this.starRating = total / 1;
        }
        else
          this.starRating = total / this.gardenerRating.length;

        if (rmIndex)
          this.gardenerRating.splice(rmIndex, 1);

        console.log(this.starRating + "=========");
      }
      this.spinner.hide();

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

  public addReview() {
    if (sessionStorage.getItem('userId') && sessionStorage.getItem('number') == "1") {
      console.log(this.addStar + "  " + this.newReview + " " + this.GardenerId);
      this.gardenerService.rateTheGardener(this.addStar, this.newReview, this.GardenerId).subscribe(data => {
        if (data.success) {
          this.toaster.success("Rated Successfullly");
          this.ngOnInit();
        }
        else {
          this.toaster.error("Not Rated");
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
    else {
      this.router.navigate(['signin']);
    }

  }

  public setData() {
    this.addStar = this.oldRate.rate;
    this.newReview = this.oldRate.review
  }


}
