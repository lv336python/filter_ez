import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DataService {

    statisticsUrl = 'api/statistics/';
    previewUrl = 'api/get_rows/';
    sendDataSetOnEmail = 'api/send_file/';
    getFilters = 'api/preview/';


    constructor(private _http: HttpClient) { }

      get(): Observable<any> {
        return this._http.get<any>('test');
    }

    getStatistics(datasetId: number): Observable<any> {
        return this._http.get<any>(this.statisticsUrl+datasetId);
    }

    getRows(datasetId, number_of_rows: number): Observable<any> {
        return this._http.get<any>(this.previewUrl+datasetId+'/'+number_of_rows);
    }

    sendFile(datasetId: number, emails:  Array<string>) {
        return this._http.post<any>(this.sendDataSetOnEmail+datasetId, {'emails': emails});
    }

    getFilter(filterId): Observable<any>{
        return this._http.get<any>(this.getFilters+filterId)
    }
}
