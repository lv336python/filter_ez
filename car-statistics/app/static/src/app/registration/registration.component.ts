import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TextFormatDirective} from "../directives/text-format.directive";
import {AuthService} from "../auth.service";

import {User} from "../models/user";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  returnUrl : string;

  registerGroup =  new FormGroup({
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
        .subscribe(res => {
            console.log(res);
            localStorage.setItem('token', res.token);
            this.router.navigate([this.returnUrl])

        })
  }


  constructor(
      private auth_ : AuthService,
      private router: Router,
      private route: ActivatedRoute) { }

  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

}
