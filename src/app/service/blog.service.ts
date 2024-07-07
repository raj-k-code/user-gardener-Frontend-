import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../model/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  public blogList(): Observable<Blog[]> {
    let blogListApi = "http://localhost:3000/blog/blog-list";
    return this.http.get<Blog[]>(blogListApi);
  }

  public blogDescription(blogId: any): Observable<Blog> {
    let blogDescriptionApi = "http://localhost:3000/blog/blog-by-id/" + blogId;
    return this.http.get<Blog>(blogDescriptionApi);
  }
}
