import {Component} from '@angular/core';
import {AuthGuardService} from "./auth.guard";
import {EventEmitterService} from "./_services/event-emitter.service";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent{
    loggedIn : string;

    constructor(
        private auth : AuthGuardService,
        private emitter: EventEmitterService
    ) {
    }

    ngOnInit() {
        this.loggedIn =  this.auth.isLogined();
        this.emitter.emitter.subscribe(
            res => {
                console.log(res + " Emitted");
                this.loggedIn = res;
            }
        );
    }

}
