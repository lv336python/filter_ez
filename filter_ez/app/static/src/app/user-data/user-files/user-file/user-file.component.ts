import {Component, Input, OnInit} from '@angular/core';
import {File} from '../../../_models/data';
import {from} from 'rxjs';
import {UserFileService} from "../../../_services/user-file.service";
import {ModalService} from "../../../_services/modal.service";
import {UserDataService} from "../../../_services/user-data.service";
import {UserDataComponent} from "../../user-data.component";


@Component({
  selector: 'app-user-file',
  templateUrl: './user-file.component.html',
  styleUrls: ['./user-file.component.css']
})
export class UserFileComponent implements OnInit {
  @Input() userfile: File;
  @Input() file_index; //for files numeration
  @Input() dataset_id;
  @Input() file_id;
  fileDeleted = false;
  errorMessage: string;
  confirmed: boolean;


  bytestToMBytes(bytes): number {
    return Math.round(bytes / (1024.0 * 1024) * 100) / 100;
  }


  deleteFile(fileId) {

    this.file.deleteUserFile(fileId).subscribe(
      res => {
        this.fileDeleted = true;
      },
      err => {
        let data_txt = (JSON.stringify(err));
        let error_data = JSON.parse(data_txt);
        this.errorMessage = error_data.error.message.toString();
      }
    );
  }

  constructor(private file: UserFileService,
              private modalService: ModalService,
              private userData: UserDataComponent) {
  }

  ngOnInit() {
  }

  openStat() {
    this.modalService.open('statModal');
    this.userData.addItem(this.userfile.datasetId, this.userfile.name);
  }
}
