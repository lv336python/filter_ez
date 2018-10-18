import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
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
    save_error: boolean;
    filter_params: object = {
        0: {
            'params': {},
            'child': false,
            'parent_id': false,
            'settings': {
                'count_rows': '',
                'quantity': '',
                'qtt_readonly': '',
            },
        }
    };

    metadata: object;
    columns: string[];

    constructor(private http: HttpClient,
                private router:Router) {

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
        console.log(data);
        this.filter_params = data;
    }

    addChild(parentIndex) {
        this.filter_params[parentIndex]['child'] = {};
        this.filter_params[parentIndex]['child'][0] = {
            'params': {},
            'child': false,
            'parent_id': parentIndex,
            'settings': {
                'count_rows': '',
                'quantity': '',
                'qtt_readonly': ''
            }
        };
        this.updateFilterParams(this.filter_params);
    }

    addLastChild(parentIndex, child_id) {
        this.filter_params[parentIndex]['child'][child_id]['child'] = {};
        this.filter_params[parentIndex]['child'][child_id]['child'][0] = {
            'params': {},
            'child': false,
            'parent_id': parentIndex,
            'child_id': child_id,
            'settings': {
                'count_rows': '',
                'quantity': '',
                'qtt_readonly': ''
            }
        };
        this.updateFilterParams(this.filter_params);
    }

    saveFilter() {
        let filter_params = {
            "0": {
                "params": {"column": "Color", "operator": "==", "value": "Red", "quantity": 4999},
                "child": {
                    "0": {
                        "params": {"column": "Country", "operator": "==", "value": "USA", "quantity": 749},
                        "child": {
                            "0": {
                                "params": {
                                    "column": "Drive Type",
                                    "operator": "==",
                                    "value": "All-Wheel",
                                    "quantity": 149
                                },
                                "child": false,
                                "parent_id": "0",
                                "child_id": "0",
                                "settings": {"count_rows": 205, "quantity": 20, "qtt_readonly": true}
                            },
                            "1": {
                                "params": {
                                    "column": "Drive Type",
                                    "operator": "==",
                                    "value": "Front-Wheel",
                                    "quantity": 74
                                },
                                "parent_id": "0",
                                "child": false,
                                "settings": {"count_rows": 183, "quantity": 10, "qtt_readonly": true}
                            }
                        },
                        "parent_id": "0",
                        "settings": {"count_rows": 874, "quantity": 15, "qtt_readonly": true}
                    },
                    "1": {
                        "params": {"column": "Country", "operator": "==", "value": "England", "quantity": 599},
                        "parent_id": "0",
                        "child": {
                            "0": {
                                "params": {
                                    "column": "Engine type",
                                    "operator": "==",
                                    "value": "Boxer",
                                    "quantity": 59
                                },
                                "parent_id": "0",
                                "child": false,
                                "settings": {"count_rows": 98, "quantity": 10, "qtt_readonly": true}
                            }
                        },
                        "settings": {"count_rows": 825, "quantity": 12, "qtt_readonly": true}
                    }
                },
                "parent_id": false,
                "settings": {"count_rows": 9829, "quantity": 10, "qtt_readonly": true}
            },
            "1": {
                "params": {"column": "Color", "operator": "==", "value": "Green", "quantity": 2499},
                "settings": {"count_rows": 9937, "quantity": 5, "qtt_readonly": true},
                "child": {
                    "0": {
                        "params": {"column": "Fuel type", "operator": "==", "value": "Petrol", "quantity": 299},
                        "child": {
                            "0": {
                                "params": {"column": "Models", "operator": "==", "value": "X5", "quantity": 14},
                                "parent_id": "1",
                                "child": false,
                                "settings": {"count_rows": 31, "quantity": 5, "qtt_readonly": true}
                            }
                        },
                        "parent_id": "1",
                        "settings": {"count_rows": 487, "quantity": 12, "qtt_readonly": true}
                    },
                    "1": {
                        "params": {"column": "Fuel type", "operator": "==", "value": "Gas", "quantity": 499},
                        "parent_id": "1",
                        "child": {
                            "0": {
                                "params": {
                                    "column": "Seat heater",
                                    "operator": "==",
                                    "value": "Yes",
                                    "quantity": 99
                                },
                                "parent_id": "1",
                                "child": false,
                                "settings": {"count_rows": 239, "quantity": 20, "qtt_readonly": true}
                            }
                        },
                        "settings": {"count_rows": 507, "quantity": 20, "qtt_readonly": true}
                    }
                }
            }
        };
        let filter = {};
        for (let key in filter_params) {
            filter[key] = this.deleteUnnecessaryElem(filter_params[key]);
            if (this.checkParams(filter[key])) {
                this.save_error = true;
                return 'error';
            }
            if ('child' in filter_params[key]) {

                for (let child_key in filter_params[key]['child']) {
                    filter[key]['child'][child_key] = this.deleteUnnecessaryElem(filter_params[key]['child'][child_key]);
                    if (this.checkParams(filter[key]['child'][child_key])) {
                        this.save_error = true;
                        return 'error';
                    }
                    if ('child' in filter_params[key]['child'][child_key]) {

                        for (let child_last_key in filter_params[key]['child'][child_key]['child']) {
                            filter[key]['child'][child_key]['child'][child_last_key] = this.deleteUnnecessaryElem(filter_params[key]['child'][child_key]['child'][child_last_key]);
                            if (this.checkParams(filter[key]['child'][child_key]['child'][child_last_key])) {
                                this.save_error = true;
                                return 'error';
                            }
                        }
                    }
                }
            }
        }
        console.log(filter);
        this.http
            .post('/api/save_filter', {
                'params': filter,
                'name': 'ggsgsd',
                'file_id': 1
            })
            .subscribe(data => this.router.navigate(['/']),
                    error => {
                         console.log(error);
                });
    }

    deleteUnnecessaryElem(object_data) {
        delete object_data.parent_id;
        delete object_data.child_id;
        delete object_data.settings;
        return object_data;
    }

    checkParams(filter) {
        return Object.keys(filter.params).length < 4;
    }
}
