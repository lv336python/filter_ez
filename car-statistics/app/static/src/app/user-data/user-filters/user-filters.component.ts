import { Component, OnInit } from '@angular/core';
import {Filter} from '../../_models/data';
import {UserDataService} from '../../_services/user-data.service';

@Component({
  selector: 'app-user-filters',
  templateUrl: './user-filters.component.html',
  styleUrls: ['./user-filters.component.css']
})
export class UserFiltersComponent implements OnInit {
  userfilters: Filter[] = [];
  constructor(private userData: UserDataService) { }

  ngOnInit() {
    this.userData.getUserData().subscribe(data => this.userfilters = data['user_filters'] );
  }

}
