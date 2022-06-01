import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GardenerService } from 'src/app/service/gardener.service';

@Component({
  selector: 'app-accepted-request',
  templateUrl: './accepted-request.component.html',
  styleUrls: ['./accepted-request.component.css']
})
export class AcceptedRequestComponent implements OnInit {
  dataList: any;
  gardenerId = sessionStorage.getItem('userId');
  flag = false;
  tempData: any = [];
  userQuery: any;

  constructor(private spinner: NgxSpinnerService, private gardenerService: GardenerService, private toaster: ToastrService) {
    spinner.show();
  }

  ngOnInit(): void {
    var i = 0;
    this.gardenerService.viewRequest(this.gardenerId).subscribe(data => {
      this.tempData = [];
      if (!data.message) {
        this.dataList = data.bookRequests;

        for (let request in this.dataList) {
          if (this.dataList[request].isApproved == true) {
            this.tempData[i++] = this.dataList[request]
          }
        }
      }
      this.spinner.hide()
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

  public cancelRequest(user: any, index: any) {
    if (confirm('Are sure you wanna cancel this user ?')) {
      var userId = "";
      var nurseryId = "";
      var email = "";

      if (user.userId) {
        userId = user.userId._id
        email = user.userId.userEmail
      }
      else {
        nurseryId = user.nurseryId._id
        email = user.nurseryId.nurseryOwnerEmail
      }

      this.gardenerService.cancelRequest(userId, email, nurseryId).subscribe(data => {
        if (data.failed) {
          this.toaster.error("Not Canceled");
        }
        else {
          this.toaster.success("Canceled Successfully");
          this.dataList.splice(index, 1);
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
  }

  public completeRequest(user: any) {
    var userId = "";
    var nurseryId = "";

    if (user.userId) {
      userId = user.userId._id
    }
    else {
      nurseryId = user.nurseryId._id
    }

    this.gardenerService.completeRequest(userId, nurseryId).subscribe(data => {
      if (data.failed) {
        this.toaster.error("Not Completed");
      }
      else {
        this.toaster.success("Completed Successfully");
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

  public showQuery(query: String) {
    this.userQuery = query;
  }
}
