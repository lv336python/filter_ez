import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter-preview',
  templateUrl: './filter-preview.component.html',
  styleUrls: ['./filter-preview.component.css']
})
export class FilterPreviewComponent implements OnInit {
  @Input() item = null;
  @Input() fileid;


  constructor() { }

  ngOnInit() {
    console.log(this.fileid)
  }

}
