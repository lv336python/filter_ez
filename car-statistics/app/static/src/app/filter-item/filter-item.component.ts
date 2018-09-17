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
  //This is test data, remove it after we will have really one
  data = {
      'Models': ['Audi', 'Green', '2001'],
      'Color':["red"],
      'Year':[1234, 2345]
  };

  columns = [];
  values = [];

  @Output() addFilterElem: EventEmitter<any> = new EventEmitter<any>();
  @Output() pushFilterParams: EventEmitter<object> = new EventEmitter<{column: string, operator:string, value:string, btw_elem_operator:string}>();

  @Input() index:number;

  constructor() { }

  ngOnInit() {
    this.columns = Object.keys(this.data);
    this.values = this.data["Models"];
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
    // this.addFilterColumn.emit({'index':this.index, 'column': column});
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
