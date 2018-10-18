import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DataService {

    get_statistics_url = 'api/statistics/';
    get_rows_url = 'api/get_rows/';
    send_dataset_on_email = 'api/send_file/';


    constructor(private _http: HttpClient) { }

      get(): Observable<any> {
        return this._http.get<any>('test');
    }

    getStatistics(dataset_id: number): Observable<any> {
        return this._http.get<any>(this.get_statistics_url+dataset_id);
    }

    getRows(dataset_id, number_of_rows: number): Observable<any> {
        return this._http.get<any>(this.get_rows_url+dataset_id+'/'+number_of_rows);
    }

    sendFile(dataset_id: number, emails:  Array<string>) {
        return this._http.post<any>(this.send_dataset_on_email+dataset_id, {'emails': emails});
    }
}
