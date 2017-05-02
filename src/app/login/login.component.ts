import {Component, OnInit} from "@angular/core";
import {Logger} from "angular2-logger/core";
import {AuthService} from "../auth.service";

declare const gapi: any;

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private logger: Logger, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.logger.info(document.readyState);
    if ((<any>window).gapi != undefined) {
      this.setupGoogleSignInButton()
    }

    (<any> window).onGoogleApiLoaded = () => {
      this.setupGoogleSignInButton()
    }
  }

  setupGoogleSignInButton() {
    this.logger.info(`Setting up google sign in button...`);
    gapi.load("auth2", () => {
      gapi.auth2.init({
        client_id: "99685742253-41uieqd0vl3e03l62c7t3impd38gdt4q.apps.googleusercontent.com"
      });

      gapi.signin2.render("google-sign-in-btn", {
        scope: "openid email profile",
        onsuccess: (googleUser: any) => {
          this.onGoogleSignedIn(googleUser)
        }
      });

      this.logger.info(`Setting up google sign in button done`);
    });
  }

  onGoogleSignedIn(googleUser: any) {
    let idToken = googleUser.getAuthResponse().id_token;
    let profile = googleUser.getBasicProfile();
    let email = profile.getEmail();
    let name = profile.getName();
    this.logger.info(`Signed in with Google as ${name} (${email})`);

    // gapi.auth2.getAuthInstance().signOut();

    this.authService.login(idToken)
  }
}
