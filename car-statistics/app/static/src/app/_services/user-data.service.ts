import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {UserData} from '../_models/data';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData = new BehaviorSubject<UserData>(null);
  castUserData = this.userData.asObservable();

  constructor(private http: HttpClient) {
  }

  getUserData() {
    return this.http
      .get('api/userdata')
      .catch(this.handleError)
      .subscribe((data: any) => this.userData.next(data));
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throwError(error.message || 'Server Error');
  }
}
