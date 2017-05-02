import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  {path: "login", component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
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
