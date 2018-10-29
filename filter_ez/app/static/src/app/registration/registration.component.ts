import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TextFormatDirective} from "../_directives/text-format.directive";
import {AuthService} from "../_services/auth.service";

import {User} from "../_models/user";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    returnUrl: string;
    isEmailBusy: boolean = false;
    errorMessage: string;
    message: boolean;
    isValidationPassed: boolean = true;
    isSubmitted: boolean = false;

    registerGroup = new FormGroup({
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

    toRegister() {
        this.auth_.toRegister(new User(this.registerGroup.controls['email'].value,
            this.registerGroup.controls['password'].value))
            .subscribe(
                res => {
                    this.isSubmitted = true;
                    localStorage.setItem('token', res.token);
                    let dataText = (JSON.stringify(res));
                    let responseText = JSON.parse(dataText);
                    this.message = responseText.message;
                    this.registerGroup.setValue({email: '', password: ''});
                    this.isValidationPassed = false;
                },
                err => {
                    this.isEmailBusy = true;
                    let dataText = (JSON.stringify(err));
                    let errorData = JSON.parse(dataText);
                    this.errorMessage = errorData.error.message.toString();
                })
    }

    get password() {
        return this.registerGroup.get('password')
    }

    get email() {
        return this.registerGroup.get('email')
    }

    constructor(
        private auth_: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
}
