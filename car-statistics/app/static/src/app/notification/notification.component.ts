import {Component, Input, OnInit} from '@angular/core';
import {SocketService} from "../socket.service";
import {DataService} from "../data.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
    @Input() loggedIn : string;

  constructor(private socket: SocketService,
              private data: DataService) {
    }

    messages = [];
    connection;

    ngOnInit() {
        this.connection = this.socket.getMessages()
            .subscribe(
            data => {
                this.messages.push(data);
               }
            );
    }

    removeNotification(element : Node, index: number) {
        element.parentElement.remove();
        this.messages.splice(index, 1);
    }


}
