import {Component, Input, OnInit} from '@angular/core';
import {DataSet} from '../../../_models/data';

import {UserFileService} from "../../../_services/user-file.service";
import 'rxjs/Rx' ;
import {ModalService} from "../../../_services/modal.service";
import {UserDataService} from "../../../_services/user-data.service";
import {UserDataComponent} from "../../user-data.component";

@Component({
  selector: 'app-user-data-set',
  templateUrl: './user-data-set.component.html',
  styleUrls: ['./user-data-set.component.css']
})
export class UserDataSetComponent implements OnInit {
  @Input() userdataset: DataSet;
  datasetDeleted : boolean;
  errorMessage : string;
  constructor(private file: UserFileService,
              private modalService: ModalService,
              private userData: UserDataComponent,
              private userDataService : UserDataService) {
  }


  downloadDataset(datasetId) {
    let thefile = {};
    this.file.downloadDataset(datasetId).subscribe(
      data => thefile = new Blob([data], {type: "text/xlsx"})
    );
  }


  ngOnInit() {
  }

  openStat() {
        this.modalService.open('statModal');
        this.userData.addItem(this.userdataset.id, this.userdataset.name);
    }
    deleteDataset(datasetId) {

      this.file.deleteUserDataset(datasetId).subscribe(
        res => {
          this.datasetDeleted = true;
          this.userDataService.getUserData();
        },
        err => {
          let data_txt = (JSON.stringify(err));
          let error_data = JSON.parse(data_txt);
          this.errorMessage = error_data.error.message.toString();
        }
      );
    }

}
