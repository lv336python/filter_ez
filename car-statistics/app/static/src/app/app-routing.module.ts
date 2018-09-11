import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {NotfoundComponent} from "./notfound/notfound.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthGuard} from "./auth.guard";
import {ConfirmEmailComponent} from "./confirm-email/confirm-email.component";

const routes: Routes = [
	{path: '', component:HomeComponent},
	{path: 'register', component: RegistrationComponent, canActivate: [AuthGuard]},
	{path: 'confirm/:token', component: ConfirmEmailComponent},
	{path: '**', component: NotfoundComponent},
];

@NgModule({
  exports : [RouterModule],
  imports : [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
