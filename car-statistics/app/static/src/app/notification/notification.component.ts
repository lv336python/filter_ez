import {Component, Input, OnInit} from '@angular/core';
import {SocketService} from "../socket.service";
import {DataService} from "../data.service";
import {AuthGuardService} from "../auth.guard";
import {stringify} from "querystring";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private socket: SocketService,
              private auth: AuthService,
              private auth_guard: AuthGuardService) {
    }

    messages = [];
    connection;

    ngOnInit() {
        if(this.auth_guard.isLogined()) {
            this.socket.connect();
            this.connection = this.socket.getMessages()
                .subscribe(
                    data => {
                        this.messages.push(data);
                    }
                );
            this.socket.joinRoom();
        }
    }

    removeNotification(element : Node, index: number) {
        element.parentElement.remove();
        this.messages.splice(index, 1);
    }


}
