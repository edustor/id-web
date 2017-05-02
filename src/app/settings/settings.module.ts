import {NgModule} from "@angular/core";

import {SettingsRoutingModule} from "./settings-routing.module";
import {SettingsComponent} from "./settings.component";

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    SettingsRoutingModule
  ]
})
export class SettingsModule {
  constructor() {

  }
}
