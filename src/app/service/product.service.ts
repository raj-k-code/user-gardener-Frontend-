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
    let viewProductListApi = "http://localhost:3000/product/product-list";
    return this.http.get<Product[]>(viewProductListApi);
  }

  public searchProduct(searchText: any): Observable<Product[]> {
    let searchProductApi = "http://localhost:3000/product/product-search/" + searchText;
    return this.http.get<Product[]>(searchProductApi);
  }
}
