import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class UserFileService {
    deleteUserFileUrl = '/api/delete_file';
    downloadDataSetUrl = '/api/download';
    deleteUserFilterUrl = '/api/delete_filter';
    deleteUserDatasetUrl = '/api/delete_dataset';


    constructor( private _http : HttpClient) { }

    deleteUserFile(fileId) : Observable<any>{
        return this._http.get<any>(this.deleteUserFileUrl + '/' + fileId)
    }

    downloadDataset(datasetId) : Observable<any>{
        return this._http.get<any>(this.downloadDataSetUrl + '/' + datasetId)
    }

    deleteUserFilter(filterId) : Observable<any>{
        return this._http.get<any>(this.deleteUserFilterUrl + '/' + filterId)
    }
    deleteUserDataset(datasetId) : Observable<any>{
        return this._http.get<any>(this.deleteUserDatasetUrl + '/' + datasetId)
    }
}
