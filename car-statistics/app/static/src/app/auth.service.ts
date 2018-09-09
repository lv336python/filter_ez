import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login_api_url = "/login";
  register_api_url = "/register";

  constructor(
      private _http: HttpClient,
      ) { }

  toRegister(user: User) : Observable<any> {
    return this._http.post<any>(this.register_api_url, user);
  }

  toLogin(user: User) : Observable<any> {
    return this._http.post<any>(this.login_api_url, user);
  }

}
