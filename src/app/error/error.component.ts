import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorId: string;
  errorMessage: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log(this.route);
    let self = this;
    this.route.queryParams.subscribe((params: Params) => {
      self.errorMessage = params['m'];
      self.errorId = params['id'];
      return self.errorMessage;
    });
  }
}
