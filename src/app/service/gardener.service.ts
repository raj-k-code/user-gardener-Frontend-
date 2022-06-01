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
    let signInApi = "https://prakritee.herokuapp.com/gardener/signin";
    return this.http.post<any>(signInApi, { gardenerEmail: gardener.gardenerEmail, gardenerPassword: gardener.gardenerPassword });
  }

  public signInWithGoogle(email: any) {
    let signInWithGoogleApi = "https://prakritee.herokuapp.com/gardener/signin-with-google";
    return this.http.post<any>(signInWithGoogleApi, { gardenerEmail: email });
  }

  public signUp(gardener: Gardener) {
    let signUpApi = "https://prakritee.herokuapp.com/gardener/signup";
    return this.http.post<any>(signUpApi, { gardenerName: gardener.gardenerName, gardenerEmail: gardener.gardenerEmail, gardenerPassword: gardener.gardenerPassword, gardenerMobile: gardener.gardenerMobile, gardenerAddress: gardener.gardenerAddress, gardenerExperience: gardener.gardenerExperience })
  }

  public gardenerList(): Observable<Gardener[]> {
    let gardenerListApi = "https://prakritee.herokuapp.com/gardener/gardener-list"
    return this.http.get<Gardener[]>(gardenerListApi);
  }

  public forgotPassword(email: string) {
    let forgotPasswordApi = "https://prakritee.herokuapp.com/gardener/forgot-password"
    return this.http.post<any>(forgotPasswordApi, { gardenerEmail: email });
  }

  public bookTheGardener(gardenerId: string, query: any) {
    let bookTheGardenerApi = "https://prakritee.herokuapp.com/gardener/book-gardener"
    return this.http.post<any>(bookTheGardenerApi, { userId: sessionStorage.getItem('userId'), gardenerId: gardenerId, query: query });
  }

  public approveRequest(userId: any, email: any, nurseryId: any) {
    let approveRequestApi = "https://prakritee.herokuapp.com/gardener/approve-request"
    return this.http.post<any>(approveRequestApi, { gardenerId: sessionStorage.getItem('userId'), nurseryId: nurseryId, userId: userId, email: email });
  }

  public cancelRequest(userId: any, email: any, nurseryId: any) {
    let cancelRequestApi = "https://prakritee.herokuapp.com/gardener/cancel-request"
    return this.http.post<any>(cancelRequestApi, { gardenerId: sessionStorage.getItem('userId'), nurseryId: nurseryId, userId: userId, email: email });
  }

  public viewRequest(gardenerId: any) {
    let viewRequestApi = "https://prakritee.herokuapp.com/gardener/view-request"
    return this.http.post<any>(viewRequestApi, { gardenerId: gardenerId });
  }

  public viewAllRequest() {
    let viewAllRequestApi = "https://prakritee.herokuapp.com/gardener/view-all-request"
    return this.http.get<any>(viewAllRequestApi);
  }


  public viewProfile(id: any): Observable<Gardener> {
    let viewProfileApi = "https://prakritee.herokuapp.com/gardener/gardner-by-id/" + id;
    return this.http.get<Gardener>(viewProfileApi);
  }

  public updateProfile(formData: any): Observable<any> {
    let updateProfileApi = "https://prakritee.herokuapp.com/gardener/edit";
    return this.http.post<any>(updateProfileApi, formData);
  }

  public rateTheGardener(rate: any, review: any, gardenerId: any) {
    let rateTheGardenerApi = "https://prakritee.herokuapp.com/gardener/rate-the-gardener";
    return this.http.post<any>(rateTheGardenerApi, { gardenerId: gardenerId, userId: sessionStorage.getItem('userId'), rate: rate, review: review });
  }

  public checkEmail(email: any) {
    let checkEmailApi = "https://prakritee.herokuapp.com/gardener/check-email/" + email;
    return this.http.get<any>(checkEmailApi);
  }

  public checkMobile(mobile: any) {
    let checkMobileApi = "https://prakritee.herokuapp.com/gardener/check-mobile/" + mobile;
    return this.http.get<any>(checkMobileApi);
  }

  public completeRequest(userId: any, nurseryId: any) {
    let approveRequestApi = "https://prakritee.herokuapp.com/gardener/complete-request"
    return this.http.post<any>(approveRequestApi, { gardenerId: sessionStorage.getItem('userId'), nurseryId: nurseryId, userId: userId });
  }

  public alreadyExist(gardenerId: any) {
    let approveRequestApi = "https://prakritee.herokuapp.com/gardener/already-exist"
    return this.http.post<any>(approveRequestApi, { gardenerId: gardenerId, nurseryId: null, userId: sessionStorage.getItem('userId') });
  }
}
