import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class AuthGuardService implements CanActivate {
  returnUrl : string= '/login';
  constructor( private router: Router) {}
  isLogined(){
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;

    }
    let isLog = getCookie("session");
    return isLog;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isLogined()) {
      return true;
    } else {
      this.router.navigate([this.returnUrl], { queryParams: { authRedirecting : true } });
      return false;
    }
  }
}