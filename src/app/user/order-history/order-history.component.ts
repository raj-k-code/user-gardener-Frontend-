import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/service/order.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orderData: any;
  totalProduct: any;

  constructor(private spinner: NgxSpinnerService, private orderService: OrderService, private toaster: ToastrService) {
    spinner.show()
    AOS.init();
  }

  ngOnInit(): void {
    AOS.init();
    this.orderService.viewOrderHistory().subscribe(data => {
      this.orderData = data

      for (let order of this.orderData) {
        for (let product of order.productList) {
          console.log(product.qty);

        }
      }

      console.log(this.orderData);
      if (this.orderData.message)
        this.toaster.info("Order History Is Empty");

      this.spinner.hide()
    }, err => {

    });
  }

}
