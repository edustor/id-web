import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.accessToken && new Date(this.authService.accessToken.expires_at) > new Date()) {
      return true
    }

    this.router.navigate(["/login"], {queryParams: {"continue": "/settings"}});
    return false
  }
}
