import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {User} from "../_models/user";
import {style} from "@angular/animations";
import {TextFormatDirective} from "../_directives/text-format.directive";
import {SocketService} from "../socket.service";
import {EventEmitterService} from "../event-emitter.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    returnUrl: string;
    message : string;
    redirectingMessage: boolean = this.route.snapshot.queryParams["authRedirecting"] || undefined;


    loginGroup = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            TextFormatDirective(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)

        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40),
            TextFormatDirective(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        ])
    });


    toLogin() {
        this.auth_.toLogin(new User(this.loginGroup.controls['email'].value,
            this.loginGroup.controls['password'].value))
            .subscribe(
                res => {
                    this.emitter.sendMessage("loggedIn");
                    this.router.navigate([this.returnUrl]);
                },
                err => {
                    let data_txt = (JSON.stringify(err));
                    let error_data = JSON.parse(data_txt);
                    this.message = error_data.error.message.toString();
                },
            )
    }

    constructor(
        private auth_: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private socket: SocketService,
        private emitter: EventEmitterService
    ) {
    }

    get password() {
        return this.loginGroup.get('password');
    }

    get email() {
        return this.loginGroup.get('email');
    }


    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

}
