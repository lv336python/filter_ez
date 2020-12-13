import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
    returnUrl: string = '/login';

    constructor(
        private auth: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.auth.confirmEmail(this.route.snapshot.params["token"])
            .subscribe(() => this.router.navigate([this.returnUrl]));
    }
}
