import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'filter-item',
    templateUrl: './filter-item.component.html',
    styleUrls: ['./filter-item.component.css']
})
export class FilterItemComponent implements OnInit {
    column: string;
    operator: string;
    value: string;
    quantity: number;
    count_rows: any;
    operatorBtwElem = '';

    valid_quantity = true;
    maxPercentageForUser = 100;
    new_column = true;
    param_index = 0;
    quantityError: string;

    disColumn = false;
    disValue = false;
    disQuantity = false;


    values = [];

    @Output() addFilterElem: EventEmitter<any> = new EventEmitter<any>();
    @Output() pushFilterParams: EventEmitter<object> = new EventEmitter<{ column: string, operator: string, value: string, btw_elem_operator: string }>();
    @Output() saveFilter: EventEmitter<any> = new EventEmitter<any>();

    @Input() index: number;
    @Input() columns: string[];
    @Input() metadata;
    @Input() filter_parameters;
    @Input() totalRows;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
    }

    save() {
        if(!this.checkQuantity()){
            return false;
        }
        this.pushFilterParams.emit({
            'column': this.column,
            'operator': this.operator,
            'value': this.value,
            'quantity': this.calculateQuantity(),
        });
        this.saveFilter.emit();
    }

    addElem(data) {
        if(!this.checkQuantity()){
            return false;
        }
        this.valid_quantity = true;
        this.operatorElems(data);
        this.disQuantity = true;
        this.addFilterElem.emit();
        this.pushFilterParams.emit({
            'column': this.column,
            'operator': this.operator,
            'value': this.value,
            'quantity': this.calculateQuantity(),
            'btw_elem_operator': this.operatorBtwElem,
        });
    }

    addColumn(column) {
        this.column = column;
        this.value = '';
        this.values = Object.keys(this.metadata[column]);
    }

    setQuantity(quantity) {
        this.quantity = quantity;
    }

    addValue(value) {
        this.disColumn = true;
        this.value = value;
        let all_params = this.filter_parameters;
        if (this.new_column) {
            this.new_column = false;
            this.param_index = all_params.length;
            all_params.push({
                'column': this.column,
                'operator': this.operator,
                'value': this.value,
            });
        } else {
            all_params[this.param_index].value = this.value
        }
        this.http
            .post('/api/count_rows', all_params)
            .subscribe(res => this.setCountRows(res),
                error => {
                    console.log(error);
                });
    }

    addOperator(oper) {
        this.operator = oper;
    }

    operatorElems(data) {
        this.disValue = true;
        this.operatorBtwElem = data;
    }

    setPercentage() {
        if (this.totalRows != 0) {
            this.maxPercentageForUser = +(this.count_rows * 100 / this.totalRows).toFixed(2);
        } else {
            this.maxPercentageForUser = 100
        }
    }

    setCountRows(data) {
        this.count_rows = data;
        this.setPercentage();
    }

    calculateQuantity(){
        return Math.floor(this.totalRows*this.quantity/100);
    }

    checkQuantity(){
        if (!this.quantity) {
            this.valid_quantity = false;
            this.quantityError = 'This field is required';
            return false;
        } else if (this.quantity > this.maxPercentageForUser) {
            this.quantityError = "This value can't be greater then " + this.maxPercentageForUser;
            this.valid_quantity = false;
            return false;
        }
        return true;
    }

}
