import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public categoryList(): Observable<Category[]> {
    let categoryListApi = "http://localhost:3000/admin/category/category-list"
    return this.http.get<Category[]>(categoryListApi);
  }

  public categoryById(categoryId: any): Observable<Category> {
    let categoryByIdApi = "http://localhost:3000/admin/category-by-id/" + categoryId;
    return this.http.get<Category>(categoryByIdApi);
  }
}
