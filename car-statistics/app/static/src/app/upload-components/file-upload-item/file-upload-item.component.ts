import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Uploads} from '../../_models/uploads';

@Component({
  selector: 'app-file-upload-item',
  templateUrl: './file-upload-item.component.html',
  styleUrls: ['./file-upload-item.component.css']
})

export class FileUploadItemComponent implements OnInit {
  @Input() uploadfile: Uploads;
  @Output() removeItem: EventEmitter<File> = new EventEmitter<File>();

  constructor() { }

  ngOnInit() {
  }

  skipItem(event, file) {
    this.removeItem.emit(file);
    console.log(file);
  }

}