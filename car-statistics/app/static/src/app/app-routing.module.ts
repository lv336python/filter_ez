import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {HomeComponent} from "./home/home.component";
import {NotfoundComponent} from "./notfound/notfound.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
	{path: '', component:HomeComponent},
	{path: '404', component:NotfoundComponent},
	{path: 'register', component: RegistrationComponent, canActivate: [AuthGuard]},
	{path: '**', redirectTo: '404'},
];

@NgModule({
  exports : [RouterModule],
  imports : [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
