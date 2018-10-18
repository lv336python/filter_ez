import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private http: HttpClient) {
  }

  getUserData() {
    return this.http
        .get('api/userdata')
        .catch(this.handleError);

  }

  getUserFiles(data) {
    return data.user_files;
  }

  getUserDataSets(data) {
    return data.user_datasets;
  }

  getUserFilters(data) {
    return data.user_filters;
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throwError(error.message || 'Server Error');
  }
}
