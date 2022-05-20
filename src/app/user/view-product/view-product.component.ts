import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  productList?: Product[]

  constructor(private productService: ProductService, private toaster: ToastrService, private cartService: CartService) { }

  ngOnInit(): void {
    AOS.init();;
    this.productService.viewProductList().subscribe(data => {
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

  public addToCart(productId: any) {
    if (sessionStorage.getItem('userId') && sessionStorage.getItem('token')) {
      this.cartService.addToCart(productId).subscribe(data => {
        this.toaster.success("Item Added Successfully", "Success");
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
