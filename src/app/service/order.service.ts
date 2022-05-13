import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public placeOrder(orderDetails: any) {
    let placeOrderPi = "http://localhost:3000/order/order";
    return this.http.post<any>(placeOrderPi, orderDetails);
  }
}
