import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    isFileLoaded = true;

    table_columns = ['Mark', 'Model', 'Country', 'Color'];
    table_rows = [['BMW', 'X5', 'Ukraine', 'Red'],
                ['Audi', 'Z4', 'Germany', 'White'],
                ['BMW', 'F2', 'Japan', 'White']];

    constructor() { }

    ngOnInit() {
    }

}
