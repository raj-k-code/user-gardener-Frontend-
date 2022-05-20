import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public placeOrder(orderDetails: any) {
    let placeOrderPi = "https://prakritee.herokuapp.com/order/order";
    return this.http.post<any>(placeOrderPi, orderDetails);
  }

  public viewOrderHistory() {
    let viewOrderHistoryApi = "https://prakritee.herokuapp.com/order/view-order";
    return this.http.post(viewOrderHistoryApi, { userId: sessionStorage.getItem('userId') });
  }

  public particularOrder(orderId: any) {
    let particularOrderApi = "https://prakritee.herokuapp.com/order/order-by-id/" + orderId;
    return this.http.get(particularOrderApi);
  }


}
