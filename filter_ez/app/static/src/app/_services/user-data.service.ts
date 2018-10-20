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
  public userData: UserData;
  private newUserData = new BehaviorSubject<any>(null);
  castUserData = this.newUserData.asObservable();

  constructor(private http: HttpClient) {
  }

  getUserData() {
    this.http
      .get('api/userdata')
      .catch(this.handleError)
      .subscribe((data: UserData) => this.newUserData.next(this.userData = data));
  }

  onUploadComplete(file) {
    this.userData.userFiles.push(file)
    this.newUserData.next(this.userData);
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throwError(error.message || 'Server Error');
  }
}
