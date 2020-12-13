import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private url = window.location.origin;
    private socketio;

    connect() {
        console.log("user connected");
        this.socketio = io(this.url);
    }

    disconnect() {
        console.log("user disconnected");
        this.socketio.disconnect();
    }

    getNotification() {
        return new Observable(observer => {
            this.socketio.on('notification', (data) => {
                observer.next(data);
            });
        });
    }

    getStatistics(dataset_id: number) {
        return new Observable(observer => {
            this.socketio.on('statistics'+dataset_id, (data) => {
                observer.next(data);
            });
        });
    }
}