import {Component, Input, OnInit} from '@angular/core';
import {Filter} from '../../../_models/data';
import {UserDataComponent} from "../../user-data.component";
import {ModalService} from "../../../_services/modal.service";

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent implements OnInit {
  @Input() userfilter: Filter;
  message: object;

  constructor(private data: UserDataComponent,
              private modalService: ModalService) {
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
}
