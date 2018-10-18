import {Component, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {DataService} from "../_services/data.service";

@Component({
  selector: 'app-email-file',
  templateUrl: './email-file.component.html',
  styleUrls: ['./email-file.component.css'],
  animations: [
      trigger('warnignAppear', [
          transition('void => *', [
              style({transform: 'translateY(-90%)'}),
              animate(400)
          ]),
          transition('* => void', [
              animate(400, style({transform: 'translateY(-90%)'}))
          ])
      ]),
      trigger('fieldAppear', [
          transition('void => *', [
              style({transform: 'translateY(-15%)'}),
              animate(100)
          ]),
          transition('* => void', [
              animate(100, style({transform: 'translateY(-15%)'}))
          ])
      ])
  ]
})
export class EmailFileComponent implements OnInit {
  dataset_id_ : number;
  addresses = [''];
  address_indexes = [0];
  cantCreateMessage = false;
  maxNumberOfFields = false;
  cantSendMessage = false;

  @Input() set dataset_id(dataset_id : number) {
      this.dataset_id_ = dataset_id;
  }

  get dataset_id () : number {
      return this.dataset_id_;
  }

  constructor(private data_service : DataService) { }

  ngOnInit() {

  }

  isValidEmail(email : string) : boolean{
    let validate_expression = /^[a-zA-Z0-9]+[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
    if(validate_expression.test(email)) {
      return true;
    }
    return false;
  }

  addField() {
    // No more than 5 fields for email input
    if(this.addresses.length == 5) {
      this.maxNumberOfFields = true;
      setTimeout(() => {this.maxNumberOfFields = false}, 3000);
      return undefined;
    }
    // If any of the addresses is not valid and is not empty
    // can't create a new field for an email.
    if(this.addresses.some(
          addr => !this.isValidEmail(addr) && addr.trim() != ''))
    {
      this.cantCreateMessage = true;
      setTimeout(() => {this.cantCreateMessage = false}, 3000);
    }
    else {
        this.addresses.push('');
        this.address_indexes.push(this.addresses.length-1);
    }
  }

  removeField(index : number) {
    //Closes all messages and removes records about the field being removed from
    //array of addresses and email_ids
    this.cantCreateMessage = false;
    this.cantSendMessage = false;
    this.maxNumberOfFields = false;
    this.addresses.splice(index,1);
    this.address_indexes.pop();
  }

  sendResult() {
    this.cantCreateMessage = false;
    this.maxNumberOfFields = false;
    if(this.addresses.some(
        val => !this.isValidEmail(val)
    ) || this.addresses.length == 0) {
      this.cantSendMessage = true;
      setTimeout(() => {this.cantSendMessage = false}, 3000);
    }
    else {
        this.data_service.sendFile(this.dataset_id_, this.addresses)
            .subscribe(
                (res) => console.log("File sent successfully"),
                (error) => console.error(error)
            );
    }
  }

}
