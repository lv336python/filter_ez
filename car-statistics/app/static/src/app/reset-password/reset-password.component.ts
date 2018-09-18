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
                    let data_txt = (JSON.stringify(res));
                    let data = JSON.parse(data_txt);
                    document.getElementById('input_form').style.display = 'block';
                    document.getElementById('input_form').innerHTML = data.message
                }, err => {
                    let data_txt = (JSON.stringify(err));
                    let error_data = JSON.parse(data_txt);
                    document.getElementById('error').style.display = 'block';
                    document.getElementById('error').innerHTML = error_data.error.message
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
