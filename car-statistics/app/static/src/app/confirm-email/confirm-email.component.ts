import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  asf : string = "safasf";

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.asf = "SAfsaf";
      console.log('asdsad');
      this.auth.confirmEmail(this.route.snapshot.params["token"])
          .subscribe(
              resp => console.log(resp)
          );
  }

}
