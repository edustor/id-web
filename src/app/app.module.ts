import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {Logger} from "angular2-logger/core";
import {AppRoutingModule} from "./app-routing.module";
import {PageNotFoundComponent} from "./not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [Logger],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private logger: Logger) {
    this.logger.level = this.logger.Level.INFO
  }
}
