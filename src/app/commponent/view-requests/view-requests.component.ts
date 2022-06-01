import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { GardenerService } from 'src/app/service/gardener.service';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {
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
          if (this.dataList[request].isApproved == false) {
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

  public approveRequest(user: any) {

    var userId = "";
    var nurseryId = "";
    var email = "";

    if (user.isApproved == false) {
      if (confirm("Are You Sure ?")) {
        if (user.userId) {
          userId = user.userId._id
          email = user.userId.userEmail
        }
        else {
          nurseryId = user.nurseryId._id
          email = user.nurseryId.nurseryOwnerEmail
        }

        this.gardenerService.approveRequest(userId, email, nurseryId).subscribe(data => {
          if (data.failed) {
            this.toaster.error("Not Approved");
          }
          else {
            this.toaster.success("Aprroved Successfully");
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
    else
      this.toaster.info("Already Approved");
  }

  public cancelRequest(user: any, index: any) {
    if (confirm('Are sure you wanna reject this user ?')) {
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

  public showQuery(query: String) {
    this.userQuery = query;
  }
}
