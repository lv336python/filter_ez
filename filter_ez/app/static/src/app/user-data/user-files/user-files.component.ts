import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../../_services/user-data.service';

@Component({
    selector: 'app-user-files',
    templateUrl: './user-files.component.html',
    styleUrls: ['./user-files.component.css']
})
export class UserFilesComponent implements OnInit {
    userfiles: Array<object>;
    file_id: any;

    constructor(private userData: UserDataService) {
    }


    ngOnInit() {
        this.userData.castUserData.subscribe(data => this.userfiles = data.userFiles);
    }
}
