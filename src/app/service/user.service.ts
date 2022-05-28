

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public signIn(user: User) {
    let signInApi = "https://prakritee.herokuapp.com/user/signin";
    return this.http.post<any>(signInApi, { userEmail: user.userEmail, userPassword: user.userPassword });
  }

  public signInWithGoogle(email: any) {
    let signInWithGoogleApi = "https://prakritee.herokuapp.com/user/signin-with-google";
    return this.http.post<any>(signInWithGoogleApi, { userEmail: email });
  }

  public signUp(user: User) {
    let signUpApi = "https://prakritee.herokuapp.com/user/signup";
    return this.http.post<any>(signUpApi, { userName: user.userName, userEmail: user.userEmail, userPassword: user.userPassword, userMobile: user.userMobile, userAddress: user.userAddress });
  }

  public forgotPassword(email: string) {
    let forgotPasswordApi = "https://prakritee.herokuapp.com/user/forgot-password"
    return this.http.post<any>(forgotPasswordApi, { userEmail: email });
  }

  public viewProfile(): Observable<User> {
    let viewProfileApi = "https://prakritee.herokuapp.com/user/user-by-id/" + sessionStorage.getItem('userId');
    return this.http.get<User>(viewProfileApi);
  }

  public updateProfile(formData: any): Observable<any> {
    let updateProfileApi = "https://prakritee.herokuapp.com/user/edit";
    return this.http.post<any>(updateProfileApi, formData);
  }

  public checkEmail(email: any) {
    let checkEmailApi = "https://prakritee.herokuapp.com/user/check-email/" + email;
    return this.http.get<any>(checkEmailApi);
  }

  public checkMobile(mobile: any) {
    let checkMobileApi = "https://prakritee.herokuapp.com/user/check-mobile/" + mobile;
    return this.http.get<any>(checkMobileApi);
  }
}
