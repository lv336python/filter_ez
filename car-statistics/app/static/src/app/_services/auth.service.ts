import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {assertNumber} from "@angular/core/src/render3/assert";
import {User} from "../_models/user";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    login_api_url = "api/login";
    register_api_url = "api/register";
    confirm_url = "api/confirm/";
    logout_api_url = "api/logout";
    reset_password_url = "api/reset";
    reset_password_confirm_api = "api/password_reset";

    constructor(
        private _http: HttpClient,
    ) {
    }

    toRegister(user: User): Observable<any> {
        return this._http.post<any>(this.register_api_url, user)
            .pipe(
                tap(
                    data => console.log(data),
                    error => console.log(error)
                )
            );
    }

    toLogin(user: User): Observable<any> {
        return this._http.post<any>(this.login_api_url, user);
    }

    toLogout(user: User): Observable<any> {
        return this._http.post<any>(this.logout_api_url, user);
    }

    toResetPassword(email: string): Observable<any> {
        return this._http.post<any>(this.reset_password_url, {'email': email})
    }

    toResetPasswordConfirm(token, password: string): Observable<any> {
        return this._http.put<any>(this.reset_password_confirm_api + '/' + token, {'password': password})
    }

    confirmEmail(token: string): Observable<any> {

        return this._http.get<any>(this.confirm_url + token);
    }
}