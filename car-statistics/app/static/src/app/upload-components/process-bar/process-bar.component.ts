import {Component, Input, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-process-bar',
  templateUrl: './process-bar.component.html',
  styleUrls: ['./process-bar.component.css']
})
export class ProcessBarComponent implements OnInit {
    @Input() value: number = 0;

    constructor() {
    }

    ngOnInit() {
        console.log(this.value)
    }
}


