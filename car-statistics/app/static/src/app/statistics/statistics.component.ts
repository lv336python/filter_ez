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


    public graph = {
        data: [
            { x: ['', '', ''], y: [], type: 'bar' },
        ],
        layout: {
            width: 600, height: 400, title: 'Column1',
            xaxis: {title: "", tickangle: "-90", tickformat: '.3f', showline: true, type: "category"},
            modeBarButtonsToRemove: ['sendDataToCloud', 'hoverCompareCartesian']
        },
        config: {
            displayModeBar: true,
            displaylogo: false,
            modeBarButtonsToRemove: ['sendDataToCloud', 'pan2d', 'lasso2d', 'autoScale2d', 'zoom2d', 'select2d',
                'resetScale2d', 'toggleSpikelines', 'toggleHover', 'hoverClosestCartesian', 'hoverCompareCartesian'],
        }
    };

    constructor(private data : DataService) { }

    ngOnInit() {
        this.data.getStatistics(this.dataset_id)
            .subscribe(
                res => {
                    this.statistics = res;
                    this.columns = Object.keys(res);
                    this.graph.data[0].x = Object.keys(res[this.columns[0]]);
                    this.graph.layout.title = this.columns[0];
                    this.graph.data[0].y = Object.values(res[this.columns[0]])
                },
                error => {console.log(error)}
            );
    }

    makeSelection(value : string) {
        this.graph.layout.title = value;
        this.graph.data[0].x = Object.keys(this.statistics[value]);
        this.graph.data[0].y = Object.values(this.statistics[value])
    }
}
