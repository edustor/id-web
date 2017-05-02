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

    this.accessToken = await this.http.post("http://localhost:8081/oauth2/token", formData)
      .map(
        response => {
          let token = response.json() as AuthToken;
          token.expires_at = new Date();
          token.expires_at.setSeconds(token.expires_at.getSeconds() + token.expires_in - 10);
          return token
        }
      )
      .toPromise();

    return true
  }
}

class AuthToken {
  token: string;
  expires_in: number;
  expires_at: Date;
  scope: string;
}
