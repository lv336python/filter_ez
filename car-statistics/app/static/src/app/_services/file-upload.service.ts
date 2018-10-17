import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {e} from "@angular/core/src/render3";

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    constructor(private http: HttpClient) {
    }

    onRemove(selected, file) {
        for (let i = 0; i < selected.length; i++) {
            if (selected[i] === file) {
                selected.splice(i, 1);
                console.log(file);
                console.log(selected);
                break;
            }
        }
    }

}