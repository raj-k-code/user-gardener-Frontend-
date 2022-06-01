import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Gardener } from 'src/app/model/gardener';
import { GardenerService } from 'src/app/service/gardener.service';
@Component({
  selector: 'app-gardener-list',
  templateUrl: './gardener-list.component.html',
  styleUrls: ['./gardener-list.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class GardenerListComponent implements OnInit {
  gardenerList: Gardener[] = []
  starRating: any[] = [];
  page: any;
  exist: any;
  gardenerId: any;
  query: any;
  requestList: any = [];
  isBooked: any = [];
  userId = sessionStorage.getItem('userId');

  constructor(private spinner: NgxSpinnerService, private gardenerService: GardenerService, private toaster: ToastrService, private router: Router) { }

  // index = (pageNo - 1) * 8 + (index)

  ngOnInit(): void {
    this.exist = false;
    this.spinner.show()
    this.gardenerService.gardenerList().subscribe(data => {
      if (data.length > 0) {

        this.gardenerService.viewAllRequest().subscribe(list => {
          if (!list.message) {
            this.requestList = list;
            for (let gardener in data) {

              var total = 0;
              for (let rating of data[gardener].gardenerRating) {
                total = total + rating.rate;
              }

              this.starRating[gardener] = total / data[gardener].gardenerRating.length;

              this.isBooked[gardener] = false;

              for (var request of this.requestList) {
                if (request.gardenerId._id == data[gardener]._id) {
                  for (var user of request.bookRequests) {
                    if (user.userId._id == this.userId) {
                      this.isBooked[gardener] = true;
                      console.log(gardener + "===================index");
                      break;
                    }
                  }
                }
                else {
                  console.log("else");
                  // break;
                }
              }
            }
          }
        });

        this.gardenerList = data;

        console.log(this.isBooked);
        this.spinner.hide()
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

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        location.reload();
      }
    })
  }

  public bookGardener() {
    if (sessionStorage.getItem('userId') && sessionStorage.getItem('token')) {
      this.gardenerService.bookTheGardener(this.gardenerId, this.query).subscribe(data => {
        console.log(data);

        if (data.message) {
          this.toaster.info("Already Requested", "");
        }
        else {
          this.toaster.success("Successfully Request Sent", "Success");
          this.ngOnInit();
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

  public viewGardener(id: any) {
    if (sessionStorage.getItem('token') && sessionStorage.getItem('userId')) {
      this.router.navigate(['gardener-profile/' + id]);
    }
    else {
      this.router.navigate(['signin']);
    }
  }

  alreadyBook() {
    this.toaster.info("Already Booked");
  }

  setData(id: any) {
    this.gardenerId = id;
    this.query = ""
  }

  // public alreadyExist(gardenerId: any) {
  //   if (sessionStorage.getItem('userId') && sessionStorage.getItem('token')) {
  //     this.gardenerId = gardenerId
  //     this.gardenerService.alreadyExist(gardenerId).subscribe(data => {
  //       if (!data.exist) {
  //         this.exist = true
  //       }
  //       else {
  //         this.exist = false;
  //         this.toaster.info("Already Requested This Gardener");
  //       }
  //     }, err => {
  //       if (err instanceof HttpErrorResponse) {
  //         if (err.status == 500) {
  //           this.toaster.error("Internal Server Error", "Error");
  //         }
  //         else if (err.status == 400) {
  //           this.toaster.error("Bad Request", "Error");
  //         }
  //       }
  //     });
  //   }
  //   else {
  //     this.router.navigate(['signin']);
  //   }
  // }
}
