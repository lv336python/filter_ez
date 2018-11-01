import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../_services/user-data.service';
import {UserData} from '../_models/data';
import {ModalService} from "../_services/modal.service";


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  userdata: UserData;
  statToDisplay = [];

  constructor(private userData: UserDataService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.userData.getUserData();
    this.userData.castUserData.subscribe(data => this.userdata = data);
    this.userData.castStatToShow.subscribe(data => this.statToDisplay = data);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.userData.onCloseStat();
  }
}
