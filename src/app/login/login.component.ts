import {Component, NgZone, OnInit} from "@angular/core";
import {Logger} from "angular2-logger/core";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import "rxjs/Rx";
import {NotificationsService} from "angular2-notifications/dist";

declare const gapi: any;

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private logger: Logger,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private notificationsService: NotificationsService,
              private zone: NgZone
  ) {
  }

  ngOnInit(): void {
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
        onsuccess: async(googleUser: any) => {
          this.zone.run(async() => {
            await this.onGoogleSignedIn(googleUser)
          })
        }
      });

      this.logger.info(`Setting up google sign in button done`);
    });
  }

  async onGoogleSignedIn(googleUser: any) {
    let idToken = googleUser.getAuthResponse().id_token;
    let profile = googleUser.getBasicProfile();
    let email = profile.getEmail();
    let name = profile.getName();
    this.logger.info(`Signed in with Google as ${name} (${email})`);

    gapi.auth2.getAuthInstance().signOut();

    //TODO: Catch login error

    try {
      await this.authService.login(idToken);
    } catch (e) {
      let errData = e.json();
      this.notificationsService.error("Login failed", `${e.status}: ${errData.error_description}`);
      this.logger.error(`Login Failed`, errData);
      return
    }

    let redirectUrl = await this.route.queryParams
      .map(params => params['continue'] || '/')
      .first()
      .toPromise();
    this.logger.info(`Login succeed. Redirecting to ${redirectUrl}`);
    await this.router.navigate([redirectUrl]);
    this.notificationsService.info("Login succeed", `Logged in as ${email}`);
  }
}
