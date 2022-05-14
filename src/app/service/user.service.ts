

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
    let signInApi = "http://localhost:3000/user/signin";
    return this.http.post<any>(signInApi, { userEmail: user.userEmail, userPassword: user.userPassword });
  }

  public signInWithGoogle(email: any) {
    let signInWithGoogleApi = "http://localhost:3000/user/signin-with-google";
    return this.http.post<any>(signInWithGoogleApi, { userEmail: email });
  }

  public signUp(user: User) {
    let signUpApi = "http://localhost:3000/user/signup";
    return this.http.post<any>(signUpApi, user);
  }

  public forgotPassword(email: string) {
    let forgotPasswordApi = "http://localhost:3000/user/forgot-password"
    return this.http.post<any>(forgotPasswordApi, { userEmail: email });
  }

  public viewProfile(): Observable<User> {
    let viewProfileApi = "http://localhost:3000/user/user-by-id/" + sessionStorage.getItem('userId');
    return this.http.get<User>(viewProfileApi);
  }

  public updateProfile(formData: any): Observable<any> {
    let updateProfileApi = "http://localhost:3000/user/edit";
    return this.http.post<any>(updateProfileApi, formData);
  }
}
