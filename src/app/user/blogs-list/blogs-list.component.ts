import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Blog } from 'src/app/model/blog';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.css']
})
export class BlogsListComponent implements OnInit {
  page: any;
  constructor(private sppiner: NgxSpinnerService, private blogService: BlogService, private toaster: ToastrService, private router: Router) { }

  blogList: Blog[] = []

  ngOnInit(): void {
    this.sppiner.show();
    this.blogService.blogList().subscribe(data => {
      if (data.length > 0) {
        this.blogList = data
        this.sppiner.hide();
      }
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

  public viewBlog(blogId: any) {
    this.router.navigate(['blog-description/' + blogId]);
  }
}
