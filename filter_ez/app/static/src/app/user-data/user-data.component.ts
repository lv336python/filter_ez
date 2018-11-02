import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../_services/user-data.service';
import {StatInfo, UserData} from '../_models/data';
import {ModalService} from "../_services/modal.service";
import {objectify} from "tslint/lib/utils";


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  userdata: UserData;
  statToDisplay: Array<StatInfo> = [];

  constructor(private userData: UserDataService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.userData.getUserData();
    this.userData.castUserData.subscribe(data => this.userdata = data);
  }

  dismiss() {
    this.modalService.close('statModal');
    this.statToDisplay = [];
  }

  hideStat() {
    this.modalService.close('statModal');
  }

  addItem(datasetId, datasetName) {
    let item = new StatInfo(datasetId, datasetName)
    this.statToDisplay.push(item);
  }

  removeItem(item) {
    if (this.statToDisplay.length > 1) {
      this.statToDisplay.splice(this.statToDisplay.indexOf(item), 1);
    } else {
      this.dismiss();
    }
  }
}
