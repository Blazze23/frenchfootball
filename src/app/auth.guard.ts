import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MojservisService } from './mojservis.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, private mojservis: MojservisService) {}

  canActivate() {
    if(localStorage.getItem("token") != null) {
      return this.mojservis.dajToken(localStorage.getItem("token")).pipe(map(data => {
        if (data) {
          return true;
        } else {
          this.router.navigate(["/login"]);
          return false;
        }
      }));
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
