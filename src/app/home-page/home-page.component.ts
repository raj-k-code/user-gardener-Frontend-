import { HttpErrorResponse } from '@angular/common/http';
import { AotSummaryResolver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../model/category';
import { Product } from '../model/product';
import { BlogService } from '../service/blog.service';
import { CartService } from '../service/cart.service';
import { CategoryService } from '../service/category.service';
import { FavoriteService } from '../service/favorite.service';
import { ProductService } from '../service/product.service';

// import * as AOS from 'aos';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  categoryList?: Category[]
  productList: Product[] = [];

  blogList: any

  constructor(private blogService: BlogService, private categoryService: CategoryService, private toaster: ToastrService, private activatedRouter: ActivatedRoute, private productService: ProductService, private spinner: NgxSpinnerService, private cartService: CartService, private favService: FavoriteService, private router: Router) {
    this.spinner.show();
  }

  ngOnInit(): void {
    // AOS.init();


    console.log(this.activatedRouter)
    this.categoryService.categoryList().subscribe(data => {
      this.categoryList = data;
      this.spinner.hide();

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

    this.productService.viewProductList().subscribe(data => {
      this.productList = data;
      this.spinner.hide();
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
          this.toaster.info("Product Not Found Yet", "Sorry");
        }
        else if (err.status == 500) {
          this.toaster.error("Internal Server Error", "Error");

        }
        else if (err.status == 400) {
          this.toaster.error("Bad Request", "Error");

        }
      }
    });

    this.blogService.blogList().subscribe(data => {
      if (data.length > 0) {
        this.blogList = data
        this.spinner.hide();
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

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        location.reload();
      }
    })
  }


  public addToCart(productId: any) {
    if (sessionStorage.getItem('userId') && sessionStorage.getItem('token')) {
      this.cartService.addToCart(productId).subscribe(data => {
        console.log(data);

        if (data.message) {
          this.toaster.info("Already Added In Cart", "");
        }
        else {
          this.toaster.success("Item Added Successfully", "Success");
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


  public addToFav(productId: any) {
    if (sessionStorage.getItem('userId') && sessionStorage.getItem('token')) {
      this.favService.addToFav(productId).subscribe(data => {
        console.log(data);

        if (data.message) {
          this.toaster.info("Already Added In Favorite", "", {
            positionClass: 'toast-top-center'
          });
        }
        else {
          this.toaster.success("Item Added Successfully", "Success", {
            positionClass: 'toast-top-center'
          });
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

  public viewBlog(blogId: any) {
    this.router.navigate(['blog-description/' + blogId]);
  }

}
