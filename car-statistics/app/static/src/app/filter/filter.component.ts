import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    filter_number:number[] = [0];
    file_id:number;
    files = {};

    metadata:{};
    columns = [];
    value = [];

    result_params = {
        'Columns': ['bmw'],
        'Operators': ['='],
        'Values': ['1994'],
        'Btw_operators': [],
    };

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        // this.value = this.data["Models"];
        this.getFiles();

    }

    addElement(): void {
        this.filter_number.push(this.filter_number.length);
    }

    storeFilter() {
        this.http
            .post('/api/save_filter',
                this.result_params)
            .subscribe(data => {
                alert('ok');
            }, error => {
                console.log(error);
            });
    }

    pushParams(data) {
        this.result_params.Columns.push(data.column);
        this.result_params.Operators.push(data.operator);
        this.result_params.Values.push(data.value);
        this.result_params.Btw_operators.push(data.btw_elem_operator);
        console.log(this.result_params)
    }

    getFiles() {
        this.http
            .post('/api/get_files', '')
            .subscribe(res => this.files = res,
                error => {
                    console.log(error);
                });
    }

    selectFile(id){
        this.file_id = id;
        this.getMetadata(this.file_id);
    }

    getMetadata(id) {
          this.http
            .post('/api/get_metadata', {'id':id})
            .subscribe(res => this.parseMetadata(res),
                error => {
                    console.log(error);
                });
    }

    parseMetadata(data){
        this.columns = Object.keys(data);
        this.metadata = data;
    }

}
