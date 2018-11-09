import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../_services/data.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

    datasetId_: number;
    columns : Array<string>;
    rows : Array<Array<string>>;

    @Input() set datasetId(dataset_id : number) {
        this.datasetId_ = dataset_id;
        this.updateTable();
    }

    get datasetId () : number {
        return this.datasetId_;
    }

    updateTable() {
        this.data.getRows(this.datasetId, 10)
            .subscribe(
              res => {this.columns = res['columns']; this.rows = res['rows']},
              error => {console.log(error)}
            );
    }

    constructor(private data : DataService) { }

    ngOnInit() {
        this.updateTable();
    }

}
