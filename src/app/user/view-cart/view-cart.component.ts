import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { FavoriteService } from 'src/app/service/favorite.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  productList: any[] = [];
  grandTotal: any = 0;
  qty: any[] = [];
  subTotal: any[] = [];
  cartData: any[] = [];

  constructor(private cartService: CartService, private toaster: ToastrService, private favService: FavoriteService, private router: Router) { }

  ngOnInit(): void {

    this.cartService.viewCart().subscribe(data => {
      console.log(data);
      this.productList = data.productList

      this.grandTotal = 0;

      for (let index in this.productList) {
        this.subTotal[index] = this.productList[index].productPrice * 1;

        this.grandTotal += this.productList[index].productPrice
        console.log(this.productList[index].productPrice);

        this.qty[index] = 1
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

  public removeFromCart(index: number, productId: any) {
    if (confirm("Are you sure you would like to remove this item from the shopping cart?")) {
      this.cartService.removeFromCart(productId).subscribe(data => {
        if (data.message) {
          this.toaster.info("Not Removed");
        }
        else {
          this.toaster.success("Successfully Removed");
          this.productList.splice(index, 1);
          this.ngOnInit();
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
            this.toaster.error(")Bad Request", "Error");

          }
        }
      });
    }
  }

  public moveToFav(productId: any, index: any) {
    this.favService.addToFav(productId).subscribe(data => {
      if (data.message) {
        this.toaster.info("Already Added In Favorite", "");
      }
      else {
        this.toaster.success("Item Moved Successfully", "Success");

        this.cartService.removeFromCart(productId).subscribe(data => {
          if (!data.message) {
            this.productList.splice(index, 1);
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
              this.toaster.error(")Bad Request", "Error");

            }
          }
        });
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

  public updatePrice(index: any, productPrice: any) {
    if (this.qty[index] <= 100) {
      this.subTotal[index] = productPrice * this.qty[index]
      let sum = 0;
      for (let i in this.subTotal) {
        sum += this.subTotal[i];
      }

      this.grandTotal = sum
    }
    else {
      this.qty[index] = 100
      this.toaster.warning("Maximum Qauntity Is 100");
    }

    // this.grandTotal -= productPrice * (this.qty[index] - 1)
    // this.grandTotal += productPrice * this.qty[index];
  }

  public checkout() {
    // let datList = JSON.parse(localStorage.getItem('cart') + "");

    for (let index in this.productList) {
      this.cartData[index] = {
        productId: this.productList[index]._id,
        qty: this.qty[index]
      }
    }

    console.log(this.cartData);
    var orderDetails = {
      cartData: this.cartData,
      total: this.grandTotal
    }
    localStorage.setItem("cart", JSON.stringify(orderDetails));
    this.router.navigate(['place-order']);
  }
}
