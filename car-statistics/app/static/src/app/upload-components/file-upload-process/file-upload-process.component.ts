import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {EventSharingService} from '../../_services/event-sharing.service';
import {UserDataService} from '../../_services/user-data.service';

@Component({
  selector: 'app-file-upload-process',
  templateUrl: './file-upload-process.component.html',
  styleUrls: ['./file-upload-process.component.css']
})
export class FileUploadProcessComponent implements OnInit {
    status: number;
    @Input() fileUpload: File;
    @Output() onDone: EventEmitter<File> = new EventEmitter<File>();
    constructor(private http: HttpClient,
                private eventSharing: EventSharingService,
                private userData: UserDataService) {
    }

    ngOnInit() {
        const filedata = new FormData();
        filedata.set('upload_file', this.fileUpload, this.fileUpload.name);
        this.http.post('api/upload', filedata, {
            reportProgress: true,
            observe: 'events'
        })
        .subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.status = Math.round((event.loaded / event.total) * 100);
            } else if (event.type === HttpEventType.Response) {
                this.onComplete(event);
            }
        });
    }

    onComplete(event) {
        this.eventSharing.provideDatasetId(event.body['dataset_id']);
        this.userData.onUploadComplete(event.body['file']);
        this.onDone.emit(this.fileUpload);
    }
}

