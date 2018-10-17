import { Component, OnInit } from '@angular/core';
import {UserDataService} from '../../_services/user-data.service'
import {DataSet} from '../../models/data';

@Component({
  selector: 'app-user-data-sets',
  templateUrl: './user-data-sets.component.html',
  styleUrls: ['./user-data-sets.component.css']
})
export class UserDataSetsComponent implements OnInit {
  userdatasets: DataSet[] = [];
  constructor(private userData: UserDataService) { }

  ngOnInit() {
    this.userData.getUserData().subscribe(data => this.userdatasets = data['user_datasets'] );
  }

}
