import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    dataset_id : number;
    marked = false;

    constructor(private data: DataService) { }

    ngOnInit() {
    }

    changeMarked() {
        setTimeout(() => {this.marked = true}, 10000);
    }

    fileUploadHandler(dataset_id : number) {
        console.log(dataset_id);
        this.dataset_id = dataset_id
    }


    sendFile() {
        this.data.get()
            .subscribe(
                res => console.log(res)
            )
    }
}
