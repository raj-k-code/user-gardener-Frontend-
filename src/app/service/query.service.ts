import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }

  public sendQuery(queryData: any) {
    let sendQueryApi = "http://localhost:3000/query/add"
    return this.http.post<any>(sendQueryApi, queryData);
  }

}
