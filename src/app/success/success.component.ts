import { Component, OnInit } from '@angular/core';
import {SuccessService} from "./success-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  id:string;
  width: number;
  height: number;

  constructor(private router: Router,private ss: SuccessService) { }

  ngOnInit() {
    if (!this.ss.id){
      this.router.navigate(["/"]);
      return;
    }
    this.id = this.ss.id;
    this.width = this.ss.width;
    this.height = this.ss.height;
  }

}
