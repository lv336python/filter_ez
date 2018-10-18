import { Component } from '@angular/core';
import {DataService} from "../_services/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    datasetId : number;
    marked = false;

    constructor(private data: DataService) { }

    changeMarked() {
        setTimeout(() => {this.marked = true}, 10000);
    }

    fileUploadHandler(datasetId : number) {
        this.datasetId = datasetId
    }

    sendFile() {
        this.data.get()
            .subscribe(
                res => console.log(res)
            )
    }
}
