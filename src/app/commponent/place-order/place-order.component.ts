import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
declare let Razorpay: any;

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  orderDetails: any;
  Name: any;
  Mobile: any;
  Address: any;
  City: any;
  Country: any;
  userId: any;
  productList: any;
  total: any;
  paymentMethod: any;

  constructor(private orderService: OrderService, private toaster: ToastrService, private cartService: CartService, private router: Router) {
  }

  ngOnInit(): void {
  }

  public placeOrder() {
    let cartData = JSON.parse(localStorage.getItem('cart') + "");
    var method;
    if (this.paymentMethod == 2) {
      method = "Cash On Delivery"
    }
    this.orderDetails = {
      Name: this.Name,
      Mobile: this.Mobile,
      Address: this.Address,
      userId: sessionStorage.getItem('userId'),
      productList: cartData.cartData,
      total: cartData.total,
      whose: sessionStorage.getItem('number'),
      paymentMethod: method
    }

    this.orderService.placeOrder(this.orderDetails).subscribe(data => {
      console.log(data);

      if (data.failed) {
        this.toaster.error("Order Not Placed", "Error");
      }
      else {
        if (!(this.paymentMethod == 2)) {
          var data = data;
          var options = {
            "key": "rzp_test_2ZGv8MA0qkfdTz", // Enter the Key ID generated from the Dashboard
            "amount": this.orderDetails.total + "00", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Prakriti",
            "description": "The Green Wave",
            "image": "../../../assets/images/logoprikriti1.png",
            "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:3000/order/order-status",
            "prefill": {
              "name": this.orderDetails.Name,
              "email": "rajkasotiya26@gmail.com",
              "contact": this.orderDetails.Mobile
            },
            "notes": {
              "address": "Razorpay Corporate Office"
            },
            "theme": {
              "color": "Green"
              // "color": "#3399cc"

            }
          };
          var rzp1 = new Razorpay(options);

          rzp1.open();
          this.toaster.success("Order Placed Successfully", "Success");
        }
        else {
          this.toaster.success("Order Placed Successfully", "Success");
          this.router.navigate(['/']);
        }


        this.cartService.deleteCart().subscribe(data => {
          if (!data.message) {
            // this.toaster.info("Cart Deleted")
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
