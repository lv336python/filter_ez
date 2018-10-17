import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  onRemove(selected, file) {
      for (let i = 0; i < selected.length; i++) {
            if (selected[i] === file) {
                delete selected[i];
                console.log(file);
                console.log(selected);
                break;
            }}
  }

  onUpload(selected) {
      selected.forEach(file => {
          if (file !== undefined) {
              this.sendFile(file);
          }
      });
  }

  sendFile(file: File) {
        const filedata = new FormData();
        filedata.set('upload_file', file, file.name);
        this.http.post('api/upload', filedata)
            .subscribe(res => {
                console.log(res);
            });
  }
}