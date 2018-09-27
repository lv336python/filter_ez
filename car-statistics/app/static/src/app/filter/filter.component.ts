import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    filter_number: number[] = [0];
    file_id: number;
    files = {};

    totalRows = 0;

    metadata: {};
    columns = [];
    value = [];

    filter_params = [];

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.getFiles();

    }

    addElement(): void {
        this.filter_number.push(this.filter_number.length);
    }

    storeFilter() {
        this.http
            .post('/api/save_filter',
                this.filter_params)
            .subscribe(data => {
                console.log('nummmber = '+data)
            }, error => {
                console.log(error);
            });
    }

    pushParams(data) {
        this.filter_params.push(data);
    }

    getFiles() {
        this.http
            .post('/api/get_files', '')
            .subscribe(res => this.files = res,
                error => {
                    console.log(error);
                });
    }

    selectFile(id) {
        this.file_id = id;
        this.getMetadata(this.file_id);
    }

    getMetadata(id) {
        this.http
            .post('/api/get_metadata', {'id': id})
            .subscribe(res => this.parseMetadata(res),
                error => {
                    console.log(error);
                });
    }

    parseMetadata(data) {
        this.totalRows = data['rows'];
        this.columns = Object.keys(data['metadata']);
        this.metadata = data['metadata'];
    }

}
