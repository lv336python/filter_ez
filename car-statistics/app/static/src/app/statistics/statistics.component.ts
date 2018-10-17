import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {update} from "plotly.js";


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

    dataset_id_ : number;
    columns : Array<string>;
    statistics : Object;

    plot : string = 'bar';

    public graph = {
        pie: [
            { labels: [], values: [], type: 'pie' },
        ],
        bar: [
            {x:[], y:[], type: 'bar' },
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

    get dataset_id() : number {
        return this.dataset_id_;
    }

    @Input() set dataset_id(name: number) {
        this.dataset_id_ = name;
        this.updateGraph();
    }

    constructor(private data : DataService) { }

    updateGraph() {
        this.data.getStatistics(this.dataset_id)
            .subscribe(
                res => {
                    this.statistics = res;
                    this.columns = Object.keys(res);
                    this.graph.layout.title = this.columns[0];
                    this.graph.pie[0].labels = Object.keys(res[this.columns[0]]);
                    this.graph.pie[0].values = Object.values(res[this.columns[0]]);
                    this.graph.bar[0].x = Object.keys(res[this.columns[0]]);
                    this.graph.bar[0].y = Object.values(res[this.columns[0]]);
                },
                error => {console.log(error)}
            );
    }

    ngOnInit() {
        this.updateGraph();
    }

    setPlot(plot_type : string, target, opp: Element) {
        this.plot = plot_type;
        target.className += ' active';
        opp.className = opp.className.replace(' active', '');
    }

    makeSelection(value : string) {
        this.graph.layout.title = value;

        this.graph.pie[0].labels = Object.keys(this.statistics[value]);
        this.graph.pie[0].values = Object.values(this.statistics[value]);

        this.graph.bar[0].x = Object.keys(this.statistics[value]);
        this.graph.bar[0].y = Object.values(this.statistics[value]);
    }
}
