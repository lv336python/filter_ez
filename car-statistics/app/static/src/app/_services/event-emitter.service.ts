import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

    emitter = new EventEmitter();

    sendMessage(message: string) {
        this.emitter.emit(message);
    }

    constructor() { }
}
