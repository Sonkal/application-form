import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {ErrorService} from "./error.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorId: string;
  errorMessage: string;
  errorDetail: string;

  constructor(private route: ActivatedRoute, private es:ErrorService) {
  }

  ngOnInit() {
    this.errorId = this.es.error.id;
    this.errorMessage = this.es.error.message;
    this.errorDetail = this.es.error.details;
  }

}
