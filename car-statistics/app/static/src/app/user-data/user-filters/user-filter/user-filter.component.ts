import {Component, Input, OnInit} from '@angular/core';
import {Filter} from '../../../models/data';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent implements OnInit {
  @Input() userfilter: Filter;

  ngOnInit() {
  }

}
