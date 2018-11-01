import {Component, Input, OnInit} from '@angular/core';
import {Filter} from '../../../_models/data';
import {DataService} from "../../../_services/data.service";

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent implements OnInit {
  @Input() userfilter: Filter;
  message: object;

  constructor(private data: DataService) {
  }

  ngOnInit() {
    console.log(this.userfilter)
  }

    toData() {
      this.data.getFilter(this.userfilter.id)
                  .subscribe(
                res => {this.message = res.message;
                console.log(this.message);},
                error => console.error(error)
            );
  }
}
