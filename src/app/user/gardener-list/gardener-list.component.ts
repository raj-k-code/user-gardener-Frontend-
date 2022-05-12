import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Gardener } from 'src/app/model/gardener';
import { GardenerService } from 'src/app/service/gardener.service';

@Component({
  selector: 'app-gardener-list',
  templateUrl: './gardener-list.component.html',
  styleUrls: ['./gardener-list.component.css']
})
export class GardenerListComponent implements OnInit {
  gardenerList?: Gardener[]
  starRating = 0;

  constructor(private gardenerService: GardenerService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.gardenerService.gardenerList().subscribe(data => {
      if (data.length > 0) {
        this.gardenerList = data;
      }
      else
        this.toaster.info("No Gardener Available", "Sorry");

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

  public ratingGardener(gardenerRating: any) {
    var total = 0;
    for (let rating of gardenerRating) {
      total = total + rating.rate;
    }
    this.starRating = total / 5;
    console.log(this.starRating);
    alert(this.starRating);
  }

}
