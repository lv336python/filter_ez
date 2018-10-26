import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../../_services/user-data.service';

@Component({
  selector: 'app-user-filters',
  templateUrl: './user-filters.component.html',
  styleUrls: ['./user-filters.component.css']
})
export class UserFiltersComponent implements OnInit {
  userfilters: Array<object>;

  constructor(private userData: UserDataService) {
  }

  ngOnInit() {
    this.userData.castUserData.subscribe(data => this.userfilters = data.userFilters);
  }

}
