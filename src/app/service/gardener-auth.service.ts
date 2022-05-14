import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GardenerAuthService implements CanActivate {

  constructor(private router: Router, private toaster: ToastrService) { }

  canActivate() {
    if (sessionStorage.getItem('number') == "2")
      return true
    else {
      this.toaster.warning("Only Gardener Can Visit This Link", "Restriction");
      this.router.navigate(['/']);
      return false
    }
  }
}
