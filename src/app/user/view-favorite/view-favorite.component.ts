import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';
import { FavoriteService } from 'src/app/service/favorite.service';

@Component({
  selector: 'app-view-favorite',
  templateUrl: './view-favorite.component.html',
  styleUrls: ['./view-favorite.component.css']
})
export class ViewFavoriteComponent implements OnInit {
  productList: any;
  constructor(private favoriteService: FavoriteService, private toaster: ToastrService, private cartService: CartService) { }

  ngOnInit(): void {
    this.favoriteService.viewFav().subscribe(data => {
      console.log(data);
      this.productList = data.productList

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

  public removeFromFav(index: number, productId: any) {
    if (confirm("Are you sure you would like to remove this item from the favorites?")) {
      this.favoriteService.removeFromFav(productId).subscribe(data => {
        if (data.message) {
          this.toaster.info("Not Removed");
        }
        else {
          this.toaster.success("Successfully Removed");
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
  }

  public moveToFav(productId: any, index: any) {
    this.cartService.addToCart(productId).subscribe(data => {
      if (data.message) {
        this.toaster.info("Already Added In Cart", "");
      }
      else {
        this.toaster.success("Item Moved Successfully", "Success");

        this.favoriteService.removeFromFav(productId).subscribe(data => {
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

}
