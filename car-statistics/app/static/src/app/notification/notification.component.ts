import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from "../socket.service";
import {AuthGuardService} from "../auth.guard";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],

})
export class NotificationComponent implements OnInit, OnDestroy {


  constructor(private socket: SocketService,
              private auth: AuthService,
              private auth_guard: AuthGuardService) {
    }

    messages = [];
    connection;
    isMarked = [];


    ngOnInit() {
        console.log("Notification Created");
        if(this.auth_guard.isLogined()) {
            this.socket.connect();
            this.connection = this.socket.getMessages()
                .subscribe(
                    data => {
                        this.messages.push(data);
                    }
                );
        }
    }

    ngOnDestroy() {
        this.socket.disconnect();
        console.log("Notification destroyed");
    }

    removeNotification_in_time(element : Node, index: number) {
        function remove() {
            element.parentElement.remove();
            this.messages.splice(index, 1);
        }
        setTimeout(remove, 5000)
    }


    removeNotification(element : Node, index: number) {
            element.parentElement.remove();
            this.messages.splice(index, 1);
    }


    onOver(index: number): void {

        this.isMarked[index] = true;

    }

    onNotOver(index: number): void{
        this.isMarked[index] = false;
    }

}
