import {Component, Input, OnInit} from '@angular/core';
import {File} from '../../../models/data';
import { from } from 'rxjs';

@Component({
  selector: 'app-user-file',
  templateUrl: './user-file.component.html',
  styleUrls: ['./user-file.component.css']
})
export class UserFileComponent implements OnInit {
  @Input() userfile: File;
  @Input() i; //for files numeration

  constructor() {
  }

  ngOnInit() {
  }

}
