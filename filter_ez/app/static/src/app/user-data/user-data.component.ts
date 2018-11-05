import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../_services/user-data.service';
import {StatInfo, UserData} from '../_models/data';
import {ModalService} from "../_services/modal.service";
import {DataService} from "../_services/data.service";


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  userdata: UserData;
  statToDisplay: Array<StatInfo> = [];
  message;
  filterFile = null;

  constructor(private userData: UserDataService,
              private data: DataService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.userData.getUserData();
    this.userData.castUserData.subscribe(data => this.userdata = data);
  }

  dismiss(id: string) {
    this.modalService.close(id);
    this.statToDisplay = [];
  }

  hideStat() {
    this.modalService.close('statModal');
  }

  addItem(datasetId, datasetName) {
    let item = new StatInfo(datasetId, datasetName);
    this.statToDisplay.push(item);
  }

  removeItem(item) {
    if (this.statToDisplay.length > 1) {
      this.statToDisplay.splice(this.statToDisplay.indexOf(item), 1);
    } else {
      this.dismiss('statModal');
    }
  }

  toData(filterId, fileId) {
      this.data.getFilter(filterId)
                  .subscribe(
                res => {this.message = res.message;
                console.log(this.message);},
                error => console.error(error)
            );
      this.filterFile = fileId;
  }
}
