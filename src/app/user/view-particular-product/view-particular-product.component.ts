import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { FavoriteService } from 'src/app/service/favorite.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-view-particular-product',
  templateUrl: './view-particular-product.component.html',
  styleUrls: ['./view-particular-product.component.css']
})
export class ViewParticularProductComponent implements OnInit {
  productId: any;
  product = new Product("", "", "", "", "", "", "");
  starRating = 0;
  status = false;
  number: any

  constructor(private activatedRouter: ActivatedRoute, private toaster: ToastrService, private productService: ProductService, private router: Router, private cartService: CartService, private favService: FavoriteService) {
    this.productId = activatedRouter.snapshot.paramMap.get('id');

    productService.productById(this.productId).subscribe(data => {
      console.log(data);
      var total = 0;
      if (data._id) {
        for (let rating of data.productRating) {
          total = total + rating.rate;
        }

        this.starRating = total / 5;

        this.product = data;
        console.log(this.product);
      }
      else {
        toaster.info("This Is Product Not Found", "Sorry");
        router.navigate(['/']);
      }
    }, err => {

    });
  }

  ngOnInit(): void {
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
      this.status = true;
    }
  }

  continueToLogin() {
    sessionStorage.setItem("number", this.number);
    this.router.navigate(['signin']);
  }

  public addToFav(productId: any) {
    if (sessionStorage.getItem('userId') && sessionStorage.getItem('token')) {
      this.favService.addToFav(productId).subscribe(data => {
        console.log(data);

        if (data.message) {
          this.toaster.info("Already Added In Favorite", "");
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
      this.status = true;
    }
  }

}
