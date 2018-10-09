import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'filter-tree',
    templateUrl: './filter-tree.component.html',
    styleUrls: ['./filter-tree.component.css']
})
export class FilterTreeComponent implements OnInit {

    files: string[];
    file_id: number;
    totalRows: number;
    filter_params: object = {
        0: {
            'params': {},
            'child': {},
            'settings':{
                'count_rows':'',
                'quantity':'',
                'qtt_readonly':'',
            },
        }
    };

    metadata: object;
    columns: string[];
    firstFilterColumn: number[] = [0];

    constructor(private http: HttpClient,) {

    }

    ngOnInit() {
        this.getFiles();
    }

    getFiles() {
        this.http
            .post('/api/get_files', '')
            .subscribe((res: string[]) => this.files = res,
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

    updateFilterParams(data) {
        this.filter_params = data;
        console.log(this.filter_params);
    }

     addChild(parentIndex) {
        let new_child_index = Object.keys(this.filter_params[parentIndex]['child']).length;
        this.filter_params[parentIndex]['child'][new_child_index] = {
            'params': {},
            'child': {},
            'settings': {
                'count_rows': '',
                'quantity': '',
                'qtt_readonly': '',
                'parentIndex':parentIndex
            }
        }
    }
}
