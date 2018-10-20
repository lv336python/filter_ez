import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';


@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    filter_number: number[] = [0];
    filter_name: string = '';
    file_id: number;
    files = {};
    valid_filter_name = true;

    totalRows = 0;

    metadata: {};
    columns = [];
    value = [];

    filter_params = [];

    constructor(private http: HttpClient,
                private router:Router) {
    }

    ngOnInit() {
        // this.getFiles();
    }

    addElement(): void {
        this.filter_number.push(this.filter_number.length);
    }

    storeFilter() {
        if (!this.filter_name) {
            this.valid_filter_name = false;
            return false;
        }
        this.http
            .post('/api/save_filter', {
                'params': this.filter_params,
                'name': this.filter_name,
                'file_id': this.file_id
            })
            .subscribe(data => this.router.navigate(['/'])
                , error => {
                    console.log(error);
                });
    }

    pushParams(data) {
        this.filter_params.push(data);
    }



    selectFile(id) {
        this.file_id = id;
        this.getMetadata(this.file_id);
    }

    getMetadata(id) {
        this.http
            .post('/api/get_metadata', {'file_id': this.file_id})
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

    setFilterName(value) {
        this.filter_name = value;
    }

}
