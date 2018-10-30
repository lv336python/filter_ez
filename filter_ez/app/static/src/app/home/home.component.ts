import {Component, OnInit} from '@angular/core';
import {DataService} from '../_services/data.service';
import {EventSharingService} from '../_services/event-sharing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
    datasetId: number;
    fileId: number;
    marked = false;

    constructor(private data: DataService,
                private eventSharing: EventSharingService) { }

    ngOnInit() {
        this.eventSharing.cast_dataset_id
            .subscribe(data => {
                if(data) {
                    this.datasetId = data['dataset_id'];
                    this.fileId = data['file']['id'];
                }
            });
    }

    changeMarked() {
        setTimeout(() => {this.marked = true}, 10000);
    }

    sendFile() {
        this.data.get()
            .subscribe(
                res => console.log(res)
            )
    }
}
