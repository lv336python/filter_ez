import {Component, Input, OnInit} from '@angular/core';
import {Filter} from '../../../_models/data';
import {UserDataComponent} from "../../user-data.component";
import {ModalService} from "../../../_services/modal.service";
import {UserFileService} from "../../../_services/user-file.service"
@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent implements OnInit {
  @Input() userfilter: Filter;
  message: object;
  filterDeleted : boolean = false;
  errorMessage : string;
  constructor(private data: UserDataComponent,
              private modalService: ModalService,
              private file : UserFileService) {
  }

  ngOnInit() {
  }

    toData() {
      this.data.toData(this.userfilter.id, this.userfilter.fileId)
  }

    onShow(id: string) {
      this.toData();
      this.modalService.open(id);
    }
    deleteFilter(filterId) {

    this.file.deleteUserFilter(filterId).subscribe(
      res => {
        this.filterDeleted = true;
      },
      err => {
        let data_txt = (JSON.stringify(err));
        let error_data = JSON.parse(data_txt);
        this.errorMessage = error_data.error.message.toString();
      }
    );
  }
}
