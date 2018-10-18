import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../_models/user";
import {SocketService} from "../_services/socket.service";
import {EventEmitterService} from "../_services/event-emitter.service";

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
    returnUrl: string = '/login';
    name: string;

    constructor(
        private auth_: AuthService,
        private router: Router,
        private emitter: EventEmitterService
    ) {
    }

    ngOnInit() {
        
        this.auth_.toLogout(null).subscribe(
            res => {
                this.emitter.sendMessage("loggedOut");
                this.router.navigate([this.returnUrl]);
            },
        )
   }
           
           
}
