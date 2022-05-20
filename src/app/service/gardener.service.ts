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
    return this.http.post<any>(signUpApi, gardener)
  }

  public gardenerList(): Observable<Gardener[]> {
    let gardenerListApi = "https://prakritee.herokuapp.com/gardener/gardener-list"
    return this.http.get<Gardener[]>(gardenerListApi);
  }

  public forgotPassword(email: string) {
    let forgotPasswordApi = "https://prakritee.herokuapp.com/gardener/forgot-password"
    return this.http.post<any>(forgotPasswordApi, { gardenerEmail: email });
  }

  public bookTheGardener(gardenerId: string) {
    let bookTheGardenerApi = "https://prakritee.herokuapp.com/gardener/book-gardener"
    return this.http.post<any>(bookTheGardenerApi, { userId: sessionStorage.getItem('userId'), gardenerId: gardenerId });
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

  public viewProfile(): Observable<Gardener> {
    let viewProfileApi = "https://prakritee.herokuapp.com/gardener/gardner-by-id/" + sessionStorage.getItem('userId');
    return this.http.get<Gardener>(viewProfileApi);
  }

  public updateProfile(formData: any): Observable<any> {
    let updateProfileApi = "https://prakritee.herokuapp.com/gardener/edit";
    return this.http.post<any>(updateProfileApi, formData);
  }
}
