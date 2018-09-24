import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

    @Input() dataset_id : number;
    columns : Array<string>;
    statistics : Object;


    constructor(private data : DataService) { }

    ngOnInit() {
        this.data.getStatistics(this.dataset_id)
            .subscribe(
                res => {this.statistics = res; this.columns = Object.keys(res)},
                error => {console.log(error)}
            );
    }



}
