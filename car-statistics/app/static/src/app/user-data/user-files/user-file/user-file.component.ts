import {Component, Input, OnInit} from '@angular/core';
import {File} from '../../../_models/data';
import {from} from 'rxjs';
import {UserFileService} from "../../../user-file.service";


@Component({
    selector: 'app-user-file',
    templateUrl: './user-file.component.html',
    styleUrls: ['./user-file.component.css']
})
export class UserFileComponent implements OnInit {
    @Input() userfile: File;
    @Input() file_index; //for files numeration
    @Input() dataset_id;

    showDatasetStat: boolean = false;
    fileDeleted: boolean = false;
    errorMessage: string;
    confirmed : boolean;
    getStatDataset() {
        if (this.showDatasetStat == true) {
            this.showDatasetStat = false;
        }
        else {
            this.showDatasetStat = true
        }
    }


    deleteFile(fileId) {
        this.confirmed = confirm("Are you realy want to delete this file?")
        if (!this.confirmed) {
            return false;
        }
        this.file.deleteUserFile(fileId).subscribe(
            res => {
                this.fileDeleted = true;
            },
            err =>{
                let data_txt = (JSON.stringify(err));
                let error_data = JSON.parse(data_txt);
                this.errorMessage = error_data.error.message.toString();
            }
        )
    }

    constructor(private file: UserFileService) {
    }

    ngOnInit() {
    }

}
