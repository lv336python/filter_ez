import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../models/user";
import {SocketService} from "../socket.service";

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
        private route: ActivatedRoute,
        private socket: SocketService
    ) {
    }

    ngOnInit() {
        
        this.auth_.toLogout(null).subscribe(
            res => {
                this.socket.disconnect();
                this.router.navigate([this.returnUrl]);
            },
        )
   }
           
           
}
