import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Blog } from 'src/app/model/blog';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-blog-description',
  templateUrl: './blog-description.component.html',
  styleUrls: ['./blog-description.component.css']
})
export class BlogDescriptionComponent implements OnInit {
  blogId: any
  constructor(private spinner: NgxSpinnerService, private blogService: BlogService, private toaster: ToastrService, private activated: ActivatedRoute) {
    this.spinner.show();
  }

  blog = new Blog("", "", "", "", "", "", "");

  ngOnInit(): void {
    this.blogId = this.activated.snapshot.paramMap.get('id');

    this.blogService.blogDescription(this.blogId).subscribe(data => {
      if (data) {
        this.blog = data
        this.spinner.hide()
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
