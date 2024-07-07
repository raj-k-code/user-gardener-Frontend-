import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nursury } from '../model/nursury';

@Injectable({
  providedIn: 'root'
})
export class NurseryownerService {

  constructor(private http: HttpClient) { }

  public register(nursery: Nursury) {
    let registerApi = "http://localhost:3000/nurseryowner/signup";
    return this.http.post<any>(registerApi, { nurseryName: nursery.nurseryName, nurseryOwnerName: nursery.nurseryOwnerName, nurseryOwnerEmail: nursery.nurseryOwnerEmail, nurseryOwnerPassword: nursery.nurseryOwnerPassword, nurseryOwnerMobile: nursery.nurseryOwnerMobile, nurseryAddress: nursery.nurseryAddress })
  }

  public checkEmail(email: any) {
    let checkEmailApi = "http://localhost:3000/nurseryowner/check-email/" + email;
    return this.http.get<any>(checkEmailApi);
  }

  public checkMobile(mobile: any) {
    let checkMobileApi = "http://localhost:3000/nurseryowner/check-mobile/" + mobile;
    return this.http.get<any>(checkMobileApi);
  }
}
