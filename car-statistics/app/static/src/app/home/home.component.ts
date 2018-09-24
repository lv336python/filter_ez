import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    dataset_id : number;

    constructor() { }

    ngOnInit() {

    }

    fileUploadhandler(dataset_id : number) {
        this.dataset_id = dataset_id
    }

}
