import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.css']
})
export class FilterItemComponent implements OnInit {
  column = '';
  operator = '';
  value = '';
  operatorBtwElem = '';

  disColumn=false;
  disValue=false;

  values = [];

  @Output() addFilterElem: EventEmitter<any> = new EventEmitter<any>();
  @Output() pushFilterParams: EventEmitter<object> = new EventEmitter<{column: string, operator:string, value:string, btw_elem_operator:string}>();
  @Output() saveFilter: EventEmitter<any> = new EventEmitter<any>();

  @Input() index:number;
  @Input() columns:string[];
  @Input() metadata;

  constructor() { }

  ngOnInit() {
  }
  save(){
      this.pushFilterParams.emit({
        'column': this.column,
        'operator': this.operator,
        'value': this.value,
        'btw_elem_operator': this.operatorBtwElem,
    });
      this.saveFilter.emit();
  }
  addElem(data) {
    this.operatorElems(data);
    this.addFilterElem.emit();
    this.pushFilterParams.emit({
        'column': this.column,
        'operator': this.operator,
        'value': this.value,
        'btw_elem_operator': this.operatorBtwElem,
    });
  }

  addColumn(column) {
    this.column = column;
    this.value = '';
    this.values = Object.keys(this.metadata[column]);
    console.log(this.metadata[column]);
  }

   addValue(column) {
    this.disColumn = true;
    this.value = column;
  }

  addOperator(oper) {
    this.operator = oper;
  }

  operatorElems(data) {
    this.disValue = true;
    this.operatorBtwElem = data;
  }


}
