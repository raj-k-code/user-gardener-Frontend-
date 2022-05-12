import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient,) { }

  public addToCart(productId: any) {
    let addToCartApi = "http://localhost:3000/cart/add";
    return this.http.post<any>(addToCartApi, { userId: sessionStorage.getItem('userId'), productId: productId })
  }

  public viewCart() {
    let viewCartApi = "http://localhost:3000/cart/view";
    return this.http.post<any>(viewCartApi, { userId: sessionStorage.getItem('userId') });
  }
  public removeFromCart(productId: any) {
    let removeFromCartApi = "http://localhost:3000/cart/removeProduct";
    return this.http.post<any>(removeFromCartApi, { userId: sessionStorage.getItem('userId'), productId: productId });
  }
}
