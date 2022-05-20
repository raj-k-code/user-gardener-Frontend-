import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public viewProductList(): Observable<Product[]> {
    let viewProductListApi = "https://prakritee.herokuapp.com/product/product-list";
    return this.http.get<Product[]>(viewProductListApi);
  }

  public searchProduct(searchText: any): Observable<Product[]> {
    let searchProductApi = "https://prakritee.herokuapp.com/product/product-search";
    return this.http.post<Product[]>(searchProductApi, { searchText: searchText });
  }

  public productByCategory(categoryName: String): Observable<Product[]> {
    let productByCategoryApi = "https://prakritee.herokuapp.com/product/product-list-category/" + categoryName;
    return this.http.get<Product[]>(productByCategoryApi);
  }

  public productById(productId: any): Observable<Product> {
    let productByIdApi = "https://prakritee.herokuapp.com/product/product-by-id/" + productId;
    return this.http.get<Product>(productByIdApi);
  }

  public rateTheProduct(productId: any, rate: any): Observable<any> {
    let rateTheProductApi = "https://prakritee.herokuapp.com/product/rate-the-product";
    return this.http.post<any>(rateTheProductApi, { productId: productId, rate: rate, userId: sessionStorage.getItem('userId') });
  }

}
