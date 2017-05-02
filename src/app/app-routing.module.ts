import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./not-found.component";

const appRoutes: Routes = [
  {path: "login", component: LoginComponent},
  {
    path: "settings",
    loadChildren: "app/settings/settings.module#SettingsModule"
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
