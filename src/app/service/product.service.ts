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
    let searchProductApi = "http://localhost:3000/product/product-search";
    return this.http.post<Product[]>(searchProductApi, { searchText: searchText });
  }

  public productByCategory(categoryName: String): Observable<Product[]> {
    let productByCategoryApi = "http://localhost:3000/product/product-list-category/" + categoryName;
    return this.http.get<Product[]>(productByCategoryApi);
  }

  public productById(productId: any): Observable<Product> {
    let productByIdApi = "http://localhost:3000/product/product-by-id/" + productId;
    return this.http.get<Product>(productByIdApi);
  }

}
