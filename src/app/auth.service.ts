import {Injectable} from "@angular/core";
import {Logger} from "angular2-logger/core";
import {Http} from "@angular/http";
import "rxjs/Rx";

@Injectable()
export class AuthService {

  set accessToken(accessToken: AuthToken) {
    let data = JSON.stringify(accessToken);
    this.logger.debug(`Setting accessToken: ${data}`);
    localStorage["accessToken"] = data
  }

  get accessToken(): AuthToken {
    let data = localStorage["accessToken"];
    this.logger.debug(`Getting accessToken: ${data}`);

    if (data == undefined) {
      return null
    }
    let token = JSON.parse(data) as AuthToken;
    return token;
  }

  constructor(private logger: Logger, private http: Http) {
  }

  async login(googleIdToken: String): Promise<boolean> {
    this.logger.info(`Logging in with Google ID Token ${googleIdToken}`);

    let formData = new FormData();

    formData.append("grant_type", "password");
    formData.append("username", "@google");
    formData.append("password", googleIdToken);
    formData.append("scope", "interactive token-issue");

    this.accessToken = await this.http.post("https://accounts.edustor.ru/oauth2/token", formData)
      .map(
        response => {
          let token = response.json() as AuthToken;
          token.expires_at = new Date().getTime() + (token.expires_in - 10) * 1000;
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
  expires_at: number;
  scope: string;
}
