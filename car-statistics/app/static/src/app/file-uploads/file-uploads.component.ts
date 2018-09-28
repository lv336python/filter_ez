import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
    selector: 'app-file-uploads',
    templateUrl: './file-uploads.component.html',
    styleUrls: ['./file-uploads.component.css']
})
export class FileUploadsComponent implements OnInit {
    selectedFile: File = null;

    @Output() fileUploaded: EventEmitter<number> =   new EventEmitter();

    constructor(
        private http: HttpClient,
    ) {
    }

    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];
    }

    onUpload() {
        const filedata = new FormData();
        filedata.append('upload_file', this.selectedFile, this.selectedFile.name);
        this.http.post('api/upload', filedata)
            .subscribe(res => {
                console.log(res);
                this.fileUploaded.emit(res['result'][2]);
        });

    }

    ngOnInit() {
    }

}
