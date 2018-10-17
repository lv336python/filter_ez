import {Component, Input, OnInit} from '@angular/core';
import {DataSet} from '../../../_models/data';

@Component({
  selector: 'app-user-data-set',
  templateUrl: './user-data-set.component.html',
  styleUrls: ['./user-data-set.component.css']
})
export class UserDataSetComponent implements OnInit {
  @Input() userdataset: DataSet;
  constructor() { }
  showDatasetStat: boolean = false;
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
