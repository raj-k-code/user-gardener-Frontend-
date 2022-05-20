import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  orderData: any;
  rateButton: any = [];
  starRating: any = 0;
  productId: any;

  constructor(private spnner: NgxSpinnerService, private productService: ProductService, private router: Router, private orderService: OrderService, private toaster: ToastrService, private activated: ActivatedRoute) {
    spnner.show();
    AOS.init();
  }

  ngOnInit(): void {

    var orderId = this.activated.snapshot.paramMap.get('id');
    this.orderService.particularOrder(orderId).subscribe(data => {
      this.orderData = data

      for (let product in this.orderData.productList) {
        for (let rate of this.orderData.productList[product].productId.productRating) {
          if (rate.userId == sessionStorage.getItem('userId')) {
            this.rateButton[product] = true
            console.log("inside If" + this.rateButton[product]);
          }
          else {
            this.rateButton[product] = false
            console.log("inside If" + this.rateButton[product]);
          }
        }
      }

      if (this.orderData.message) {
        this.toaster.info("Order Detailed Not Found");
        this.router.navigate(['order-history']);
      }

      this.spnner.hide()
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

  public rateTheProduct() {
    console.log(this.starRating);
    this.productService.rateTheProduct(this.productId, this.starRating).subscribe(data => {
      if (data.succes) {
        this.toaster.success("Successfully Rated The Product");
        this.ngOnInit();
      }
      else {
        this.toaster.error("Not Rated");
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

  setProductId(productId: any, productRating: any) {
    var flag = false;
    this.productId = productId;
    for (let object of productRating) {
      if (object.userId == sessionStorage.getItem('userId')) {
        this.starRating = object.rate
        flag = true
        break;
      }
    }
    if (!flag)
      this.starRating = 0;
  }

  public viewProduct(productId: any) {
    this.router.navigate(['view-particular-product/' + productId]);
  }
}
