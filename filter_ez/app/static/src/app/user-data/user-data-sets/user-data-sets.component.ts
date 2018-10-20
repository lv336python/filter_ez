import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../../_services/user-data.service'

@Component({
  selector: 'app-user-data-sets',
  templateUrl: './user-data-sets.component.html',
  styleUrls: ['./user-data-sets.component.css']
})
export class UserDataSetsComponent implements OnInit {
  userdatasets: Array<object>;

  constructor(private userData: UserDataService) {
  }

  ngOnInit() {
    this.userData.castUserData.subscribe(data => this.userdatasets = data.userDataSets);
  }
}
