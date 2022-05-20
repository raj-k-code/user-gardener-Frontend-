import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }

  public sendQuery(queryData: any) {
    let sendQueryApi = "https://prakritee.herokuapp.com/query/add"
    return this.http.post<any>(sendQueryApi, queryData);
  }

}
