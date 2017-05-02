import {Component, OnInit} from "@angular/core";
import {Logger} from "angular2-logger/core";

declare const gapi: any;



@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private logger: Logger) {
  }

  ngOnInit(): void {
    (<any> window).onGoogleSignIn = (googleUser: any) => {
      let idToken = googleUser.getAuthResponse().id_token;
      let profile = googleUser.getBasicProfile();
      let email = profile.getEmail();
      let name = profile.getName();
      this.logger.info(`Signed in as ${name} (${email})`)
    }
  }
}
