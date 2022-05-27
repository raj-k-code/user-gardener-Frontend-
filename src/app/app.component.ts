import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-gardener';
  profileImage = sessionStorage.getItem('userImage');

  constructor(private router: Router) { }

  isLoggedIn() {
    if (sessionStorage.getItem('token')) {
      return true
    }
    else {
      return false
    }
  }

  signOut() {
    if (confirm("Are You Sure ?")) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('number');
      sessionStorage.removeItem('userImage');

      this.router.navigate(['/']);
    }
  }

  whoseSignIn(number: any) {
    sessionStorage.setItem("number", number);
    this.router.navigate(['signin']);
  }

  whoseSignUp(number: any) {
    sessionStorage.setItem("number", number);
    this.router.navigate(['signup']);
    // location.reload();

  }

  gardenerOrUser(): boolean {
    if (sessionStorage.getItem("number") == "1")
      return true
    else
      return false
  }

  defaultImage() {
    this.profileImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyw551VPZXNStb2o_1PS7LJpIVrR-qbwqyDuBj6m4Xa3ePEE9DqQVB2_U9JsMoPKRrhHE&usqp=CAU"
  }
}
