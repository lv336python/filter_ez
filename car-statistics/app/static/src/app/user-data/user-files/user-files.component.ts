import { Component, OnInit, Input} from '@angular/core';
import { UserDataService } from '../../_services/user-data.service';
import {File} from '../../models/data';

@Component({
  selector: 'app-user-files',
  templateUrl: './user-files.component.html',
  styleUrls: ['./user-files.component.css']
})
export class UserFilesComponent implements OnInit {
  userfiles: File[] = [];
  file_id : any;
  constructor(private userData: UserDataService  ) {
  }


  ngOnInit() {
    this.userData.getUserData().subscribe(data => this.userfiles = data['user_files'] );
  }

}
