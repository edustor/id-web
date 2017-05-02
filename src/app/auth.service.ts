import {Injectable} from "@angular/core";
import {Logger} from "angular2-logger/core";
import {Http} from "@angular/http";
import "rxjs/Rx";

@Injectable()
export class AuthService {

  accessToken: AuthToken = null;

  constructor(private logger: Logger, private http: Http) {
  }

  async login(googleIdToken: String): Promise<boolean> {
    this.logger.info(`Logging in with Google ID Token ${googleIdToken}`);

    let formData = new FormData();

    formData.append("grant_type", "password");
    formData.append("username", "@google");
    formData.append("password", googleIdToken);
    formData.append("scope", "interactive token-issue");

    let token = await this.http.post("http://localhost:8081/oauth2/token", formData)
      .map(response => response.json() as AuthToken)
      .toPromise();

    this.accessToken = token;

    return true
  }
}

class AuthToken {
  token: String;
  expires_in: Number;
  scope: String;
}
