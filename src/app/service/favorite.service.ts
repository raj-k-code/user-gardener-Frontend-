import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http: HttpClient) { }

  public addToFav(productId: any) {
    let addToFavApi = "http://localhost:3000/fav/add";
    return this.http.post<any>(addToFavApi, { userId: sessionStorage.getItem('userId'), productId: productId })
  }

  public viewFav() {
    let viewFavApi = "http://localhost:3000/fav/view";
    return this.http.post<any>(viewFavApi, { userId: sessionStorage.getItem('userId') });
  }
  public removeFromFav(productId: any) {
    let removeFromFavApi = "http://localhost:3000/fav/removeProduct";
    return this.http.post<any>(removeFromFavApi, { userId: sessionStorage.getItem('userId'), productId: productId });
  }
}
