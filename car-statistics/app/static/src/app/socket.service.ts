import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
  private url = 'http://localhost:8000/';
  private socketio;

  getMessages() {
    let observable = new Observable(observer => {
      this.socketio = io(this.url);
      this.socketio.on('notification', (data) => {
        observer.next(data);
      });
      return () => {
        this.socketio.disconnect();
      };
    });
    return observable;
}
}