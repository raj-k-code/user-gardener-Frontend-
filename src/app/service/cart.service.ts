import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient,) { }

  public addToCart(productId: any) {
    let addToCartApi = "https://prakritee.herokuapp.com/cart/add";
    return this.http.post<any>(addToCartApi, { userId: sessionStorage.getItem('userId'), productId: productId })
  }

  public viewCart() {
    let viewCartApi = "https://prakritee.herokuapp.com/cart/view";
    return this.http.post<any>(viewCartApi, { userId: sessionStorage.getItem('userId') });
  }
  public removeFromCart(productId: any) {
    let removeFromCartApi = "https://prakritee.herokuapp.com/cart/removeProduct";
    return this.http.post<any>(removeFromCartApi, { userId: sessionStorage.getItem('userId'), productId: productId });
  }

  public deleteCart() {
    let deleteCartApi = "https://prakritee.herokuapp.com/cart/delete";
    return this.http.post<any>(deleteCartApi, { userId: sessionStorage.getItem('userId') });
  }
}
