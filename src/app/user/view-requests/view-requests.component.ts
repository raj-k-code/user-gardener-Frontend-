import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GardenerService } from 'src/app/service/gardener.service';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {
  dataList: any;
  gardenerId = sessionStorage.getItem('userId');

  constructor(private gardenerService: GardenerService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.gardenerService.viewRequest(this.gardenerId).subscribe(data => {
      if (!data.message) {
        this.dataList = data.bookRequests;
        console.log(this.dataList[0].userId.userImage);
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

  public approveRequest(user: any) {
    if (user.isApproved == false) {
      this.gardenerService.approveRequest(user.userId._id).subscribe(data => {
        if (data.failed) {
          this.toaster.error("Not Approved");
        }
        else {
          this.toaster.success("Aprroved Successfully");
          this.ngOnInit()
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
    else
      this.toaster.info("Already Approved");
  }

  public cancelRequest(user: any, index: any) {
    if (user.isApproved == true) {
      this.gardenerService.cancelRequest(user.userId._id).subscribe(data => {
        if (data.failed) {
          this.toaster.error("Not Canceled");
        }
        else {
          this.toaster.success("Canceled Successfully");
          this.dataList.splice(index, 1)
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
