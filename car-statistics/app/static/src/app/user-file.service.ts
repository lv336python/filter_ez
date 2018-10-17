import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class UserFileService {
  deleteUserFileUrl = '/api/delete_file'

  constructor( private _http : HttpClient) { }


  deleteUserFile(fileId) : Observable<any>{
    return this._http.get<any>(this.deleteUserFileUrl + '/' + fileId)
  }

}
