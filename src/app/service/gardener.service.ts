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
    return this.http.post<any>(signUpApi, gardener)
  }

  public gardenerList(): Observable<Gardener[]> {
    let gardenerListApi = "http://localhost:3000/gardener/gardener-list"
    return this.http.get<Gardener[]>(gardenerListApi);
  }

  public forgotPassword(email: string) {
    let forgotPasswordApi = "http://localhost:3000/gardener/forgot-password"
    return this.http.post<any>(forgotPasswordApi, { gardenerEmail: email });
  }

  public bookTheGardener(gardenerId: string) {
    let bookTheGardenerApi = "http://localhost:3000/gardener/book-gardener"
    return this.http.post<any>(bookTheGardenerApi, { userId: sessionStorage.getItem('userId'), gardenerId: gardenerId });
  }

  public approveRequest(userId: any) {
    let approveRequestApi = "http://localhost:3000/gardener/approve-request"
    return this.http.post<any>(approveRequestApi, { gardenerId: sessionStorage.getItem('userId'), userId: userId });
  }

  public cancelRequest(userId: string) {
    let cancelRequestApi = "http://localhost:3000/gardener/cancel-request"
    return this.http.post<any>(cancelRequestApi, { gardenerId: sessionStorage.getItem('userId'), userId: userId });
  }

  public viewRequest(gardenerId: any) {
    let viewRequestApi = "http://localhost:3000/gardener/view-request"
    return this.http.post<any>(viewRequestApi, { gardenerId: gardenerId });
  }
}
