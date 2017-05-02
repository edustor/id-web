import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Logger} from "angular2-logger/core";

@Injectable()
export class AuthService {
  constructor(private router: Router, private logger: Logger) {
  }

  login(googleIdToken: String) {
    this.logger.info(`Logging in with Google ID Token ${googleIdToken}`)
  }
}
