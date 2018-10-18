import {Component} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TextFormatDirective} from "../_directives/text-format.directive";


@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
    confirmMessage: boolean;
    errorMessage: string;
    isValidationPassed : boolean = true;
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
                    this.confirmMessage = true;
                    this.resetPasswordGroup.setValue({email: ''});
                    this.errorMessage =undefined;
                    this.isValidationPassed = false;

                }, err => {
                    this.errorMessage = err.error.message.toString();
                },
            )
    }

    get email() {
        return this.resetPasswordGroup.get('email')
    }

    constructor(
        private auth_: AuthService,
    ) {}
}
