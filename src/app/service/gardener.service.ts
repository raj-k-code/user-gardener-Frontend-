import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gardener } from '../model/gardener';

@Injectable({
  providedIn: 'root'
})
export class GardenerService {

  constructor(private http: HttpClient) { }

  public signIn(gardener: Gardener) {
    let signInApi = "http://localhost:3000/gardener/signin";
    return this.http.post<any>(signInApi, { gardenerEmail: gardener.gardenerEmail, gardenerPassword: gardener.gardenerPassword });
  }

  public signInWithGoogle(email: any) {
    let signInWithGoogleApi = "http://localhost:3000/gardener/signin-with-google";
    return this.http.post<any>(signInWithGoogleApi, { gardenerEmail: email });
  }

  public signUp(gardener: Gardener) {
    let signUpApi = "http://localhost:3000/gardener/signup";
    return this.http.post<any>(signUpApi, { gardenerName: gardener.gardenerName, gardenerEmail: gardener.gardenerEmail, gardenerPassword: gardener.gardenerPassword, gardenerMobile: gardener.gardenerMobile, gardenerAddress: gardener.gardenerAddress, gardenerExperience: gardener.gardenerExperience })
  }

  public gardenerList(): Observable<Gardener[]> {
    let gardenerListApi = "http://localhost:3000/gardener/gardener-list"
    return this.http.get<Gardener[]>(gardenerListApi);
  }

  public forgotPassword(email: string) {
    let forgotPasswordApi = "http://localhost:3000/gardener/forgot-password"
    return this.http.post<any>(forgotPasswordApi, { gardenerEmail: email });
  }

  public bookTheGardener(gardenerId: string, query: any) {
    let bookTheGardenerApi = "http://localhost:3000/gardener/book-gardener"
    return this.http.post<any>(bookTheGardenerApi, { userId: sessionStorage.getItem('userId'), gardenerId: gardenerId, query: query });
  }

  public approveRequest(userId: any, email: any, nurseryId: any) {
    let approveRequestApi = "http://localhost:3000/gardener/approve-request"
    return this.http.post<any>(approveRequestApi, { gardenerId: sessionStorage.getItem('userId'), nurseryId: nurseryId, userId: userId, email: email });
  }

  public cancelRequest(userId: any, email: any, nurseryId: any) {
    let cancelRequestApi = "http://localhost:3000/gardener/cancel-request"
    return this.http.post<any>(cancelRequestApi, { gardenerId: sessionStorage.getItem('userId'), nurseryId: nurseryId, userId: userId, email: email });
  }

  public viewRequest(gardenerId: any) {
    let viewRequestApi = "http://localhost:3000/gardener/view-request"
    return this.http.post<any>(viewRequestApi, { gardenerId: gardenerId });
  }

  public viewAllRequest() {
    let viewAllRequestApi = "http://localhost:3000/gardener/view-all-request"
    return this.http.get<any>(viewAllRequestApi);
  }


  public viewProfile(id: any): Observable<Gardener> {
    let viewProfileApi = "http://localhost:3000/gardener/gardner-by-id/" + id;
    return this.http.get<Gardener>(viewProfileApi);
  }

  public updateProfile(formData: any): Observable<any> {
    let updateProfileApi = "http://localhost:3000/gardener/edit";
    return this.http.post<any>(updateProfileApi, formData);
  }

  public rateTheGardener(rate: any, review: any, gardenerId: any) {
    let rateTheGardenerApi = "http://localhost:3000/gardener/rate-the-gardener";
    return this.http.post<any>(rateTheGardenerApi, { gardenerId: gardenerId, userId: sessionStorage.getItem('userId'), rate: rate, review: review });
  }

  public checkEmail(email: any) {
    let checkEmailApi = "http://localhost:3000/gardener/check-email/" + email;
    return this.http.get<any>(checkEmailApi);
  }

  public checkMobile(mobile: any) {
    let checkMobileApi = "http://localhost:3000/gardener/check-mobile/" + mobile;
    return this.http.get<any>(checkMobileApi);
  }

  public completeRequest(userId: any, nurseryId: any) {
    let approveRequestApi = "http://localhost:3000/gardener/complete-request"
    return this.http.post<any>(approveRequestApi, { gardenerId: sessionStorage.getItem('userId'), nurseryId: nurseryId, userId: userId });
  }

  public alreadyExist(gardenerId: any) {
    let approveRequestApi = "http://localhost:3000/gardener/already-exist"
    return this.http.post<any>(approveRequestApi, { gardenerId: gardenerId, nurseryId: null, userId: sessionStorage.getItem('userId') });
  }
}
