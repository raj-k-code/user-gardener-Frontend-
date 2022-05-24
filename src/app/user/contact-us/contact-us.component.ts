import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QueryService } from 'src/app/service/query.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  userId?: any;
  gardenerId?: any;

  queryData = {
    name: "",
    email: "",
    subject: "",
    message: "",
    userId: this.userId,
    gardenerId: this.gardenerId,
  }
  constructor(private queryService: QueryService, private toaster: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  addQuery() {
    if (sessionStorage.getItem('userId') && sessionStorage.getItem('token')) {
      if (sessionStorage.getItem('number') == "2") {
        this.queryData.gardenerId = sessionStorage.getItem('userId')
        this.queryData.userId = null
      }
      else {
        this.queryData.userId = sessionStorage.getItem('userId')
        this.queryData.gardenerId = null
      }

      this.queryService.sendQuery(this.queryData).subscribe(data => {
        if (data._id) {
          this.toaster.success("Query Sent", "Success");
          this.ngOnInit();
        }
        else {
          this.toaster.error("Query Doesn't Sent")
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
      this.router.navigate(['signin'])
  }
}
