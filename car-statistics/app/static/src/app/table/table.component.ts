import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

    dataset_id_: number;
    columns : Array<string>;
    rows : Array<Array<string>>;

    @Input() set dataset_id(dataset_id : number) {
        this.dataset_id_ = dataset_id;
        this.updateTable();
    }

    get dataset_id () : number {
        return this.dataset_id_;
    }

    updateTable() {
        this.data.getRows(this.dataset_id, 10)
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
