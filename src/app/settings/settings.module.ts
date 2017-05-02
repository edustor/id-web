import {NgModule} from "@angular/core";

import {SettingsRoutingModule} from "./settings-routing.module";
import {SettingsComponent} from "./settings.component";
import {AuthGuard} from "../auth-guard.service";

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    SettingsRoutingModule
  ],
  providers: [
    AuthGuard
  ]
})
export class SettingsModule {
  constructor() {

  }
}
