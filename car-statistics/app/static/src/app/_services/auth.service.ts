import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {User} from "../_models/user";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loginUrl = "api/login";
    registerUrl = "api/register";
    confirmUrl = "api/confirm/";
    logoutUrl = "api/logout";
    resetPasswordUrl = "api/reset";
    resetPasswordConfirmUrl = "api/password_reset";

    constructor(
        private httpClient: HttpClient,
    ) {}

    toRegister(user: User): Observable<any> {
        return this.httpClient.post<any>(this.registerUrl, user)
            .pipe(
                tap(
                    data => console.log(data),
                    error => console.log(error)
                )
            );
    }

    toLogin(user: User): Observable<any> {
        return this.httpClient.post<any>(this.loginUrl, user);
    }

    toLogout(user: User): Observable<any> {
        return this.httpClient.post<any>(this.logoutUrl, user);
    }

    toResetPassword(email: string): Observable<any> {
        return this.httpClient.post<any>(this.resetPasswordUrl, {'email': email})
    }

    toResetPasswordConfirm(token, password: string): Observable<any> {
        return this.httpClient.put<any>(this.resetPasswordConfirmUrl + '/' + token,
            {'password': password})
    }

    confirmEmail(token: string): Observable<any> {

        return this.httpClient.get<any>(this.confirmUrl + token);
    }
}