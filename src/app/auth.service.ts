import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Logger} from "angular2-logger/core";

@Injectable()
export class AuthService {

  accessToken: String = null;

  constructor(private router: Router, private logger: Logger) {
  }

  async login(googleIdToken: String): Promise<boolean> {
    this.logger.info(`Logging in with Google ID Token ${googleIdToken}`);
    this.accessToken = "temp";

    return true
  }
}
