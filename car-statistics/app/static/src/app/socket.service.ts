import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
  private url = window.location.origin;
  private socketio;

  joinRoom() {
    this.socketio.emit('join_room');
  }

  connect() {
    this.socketio = io(this.url);
  }

  disconnect() {
    this.socketio.disconnect();
  }

  getMessages() {
    return new Observable(observer => {
      this.socketio.on('notification', (data) => {
        observer.next(data);
      });
      return () => {
        this.socketio.disconnect();
      };
    });
  }
}