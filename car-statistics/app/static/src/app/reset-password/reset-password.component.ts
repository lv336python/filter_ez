import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


    resetPasswordGroup = new FormGroup({
        email: new FormControl('', [
            Validators.required,

        ])
    });

    changeText(id, text_to_change) {
        let elem = document.getElementById(id);
        elem.textContent = text_to_change;
    }

    toResetPassword() {
        this.auth_.toResetPassword(this.resetPasswordGroup.controls['email'].value)
            .subscribe(
                res => {
                    this.changeText("reset-password", "<h1>Please check your email</h1>")
                },
            )
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
