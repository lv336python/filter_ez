import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {File} from "../_models/data";


@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    fileId: number;
    files : Array<File>;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.getFiles();
    }

    getFiles() {
        this.http
            .post('/api/get_files', '')
            .subscribe((res: Array<File>) => this.files = res,
                error => {
                    console.log(error);
                });
    }

    selectFile(id) {
        this.fileId = id;
    }
}
