import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  returnUrl: string = 'login';

  resetPasswordGroup = new FormGroup({
        email: new FormControl('', [
            Validators.required,

        ])
    });
  toResetPassword(){
    this.auth_.toResetPassword(this.resetPasswordGroup.controls['email'].value)
            .subscribe(
                res => {
                this.router.navigate([this.returnUrl]);
            },
            )
  }
  constructor(
        private auth_: AuthService,
        private router: Router,
        private route: ActivatedRoute
  ) { }

  ngOnInit() {

  }

}
