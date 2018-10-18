import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_services/auth.service";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TextFormatDirective} from "../_directives/text-format.directive";


@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    confirm_message: boolean;
    error_message: string;
    validation_passed : boolean = true;
    resetPasswordGroup = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            TextFormatDirective(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)

        ])
    });

    toResetPassword() {
        this.auth_.toResetPassword(this.resetPasswordGroup.controls['email'].value)
            .subscribe(
                res => {
                    this.confirm_message = true;
                    this.resetPasswordGroup.setValue({email: ''});
                    this.error_message =undefined;
                    this.validation_passed = false;

                }, err => {
                    let data_txt = (JSON.stringify(err));
                    let error_data = JSON.parse(data_txt);
                    this.error_message = err.error.message.toString();


                },
            )
    }

    get email() {
        return this.resetPasswordGroup.get('email')
    }

    constructor(
        private auth_: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {

    }

}
