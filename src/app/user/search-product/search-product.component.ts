import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';
import { FavoriteService } from 'src/app/service/favorite.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  searchText: any;
  productList: any[] = []
  page: any;
  id: any;
  status = false;
  number: any;

  constructor(private productService: ProductService, private toaster: ToastrService, private cartService: CartService, private router: Router, private activetedRoute: ActivatedRoute, private favService: FavoriteService) {

    productService.viewProductList().subscribe(data => {
      this.productList = data
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
          this.toaster.info("No Products Found", "Sorry");
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

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        location.reload();
      }
    })
  }

  searchTheProduct() {
    this.productService.searchProduct(this.searchText).subscribe(data => {
      if (data.length > 0)
        this.productList = data;
      else
        this.productList = []
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
