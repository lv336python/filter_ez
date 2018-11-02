import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TextFormatDirective} from "../_directives/text-format.directive";
import {AuthService} from "../_services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-confirm-reset',
    templateUrl: './confirm-reset.component.html',
    styleUrls: ['./confirm-reset.component.css']
})
export class ConfirmResetComponent implements OnInit {
    returnUrl: string;
    errorMessage : string;
    errToken : boolean;
    resetPasswordGroup = new FormGroup({
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40),
            TextFormatDirective(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        ]),
        password_confirm: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40),
            TextFormatDirective(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        ])
    });

    toConfirmReset() {
        if (this.resetPasswordGroup.controls['password'].value ===
            this.resetPasswordGroup.controls['password_confirm'].value) {
            this.auth_.toResetPasswordConfirm(
                this.route.snapshot.params["token"],
                this.resetPasswordGroup.controls['password'].value
            ).subscribe(res => {
                this.router.navigate([this.returnUrl])
                this.resetPasswordGroup.setValue({email: '', password: ''})

            },
                err=>{
                let dataTxt = (JSON.stringify(err));
                    let errorData = JSON.parse(dataTxt);
                    this.errorMessage = errorData.error.message.toString();

                })
        }
    }

    constructor(
        private auth_: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    get password() {
        return this.resetPasswordGroup.get('password')
    }

    get password_confirm() {
        return this.resetPasswordGroup.get('password_confirm')
    }

    ngOnInit() {
        this.returnUrl = '/login';
        this.auth_.toCheckUsedToken(this.route.snapshot.params["token"]).subscribe(
            res =>{
                this.errToken = false;
            },
            err=>{
                let dataTxt = (JSON.stringify(err));
                let errorData = JSON.parse(dataTxt);
                this.errorMessage = errorData.error.message.toString();
                this.errToken = true;
            }
        )
    }

}
