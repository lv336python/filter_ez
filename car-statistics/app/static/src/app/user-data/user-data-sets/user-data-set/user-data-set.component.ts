import {Component, Input, OnInit} from '@angular/core';
import {DataSet} from '../../../models/data';
import {UserFileService} from "../../../user-file.service";
import 'rxjs/Rx' ;
@Component({
  selector: 'app-user-data-set',
  templateUrl: './user-data-set.component.html',
  styleUrls: ['./user-data-set.component.css']
})
export class UserDataSetComponent implements OnInit {
  @Input() userdataset: DataSet;
  constructor(private file : UserFileService) { }
  showDatasetStat: boolean = true;
  
  downloadDataset(datasetId) {
    let thefile = {};
    this.file.downloadDataset(datasetId).subscribe(
      data => thefile = new Blob([data], { type: "text/xlsx" } )
      
    ) 
}

  getStatDataset() {
    if (this.showDatasetStat == true) {
        this.showDatasetStat = false;
    }
    else {
        this.showDatasetStat = true
    }
}
  ngOnInit() {
  }

}
