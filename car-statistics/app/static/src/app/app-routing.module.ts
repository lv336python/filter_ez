import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {NotfoundComponent} from "./notfound/notfound.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthGuard} from "./auth.guard";
import {ConfirmEmailComponent} from "./confirm-email/confirm-email.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component"
import {ResetPasswordComponent} from "./reset-password/reset-password.component"
import {ConfirmResetComponent} from "./confirm-reset/confirm-reset.component"

const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'register', component: RegistrationComponent},
    {path: 'confirm/:token', component: ConfirmEmailComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'reset', component: ResetPasswordComponent},
    {path: 'reset_password_confirm/:token', component: ConfirmResetComponent},
    {path: '**', component: NotfoundComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {
}
