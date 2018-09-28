import {Component} from '@angular/core';
import {AuthGuardService} from "./auth.guard";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent{
    loggedIn : string;

    constructor(private auth : AuthGuardService) {
    }

    ngOnInit() {
        this.loggedIn =  this.auth.isLogined();
    }

}
