import { Component, OnInit } from '@angular/core';
import {AppService} from "../service/app-service";
import {Application} from "@sonkal/application-type"

@Component({
  selector: 'app-form',
  templateUrl: 'app-form.component.html',
  styleUrls: ['app-form.component.css']
})
export class AppFormComponent implements OnInit {

  model:Application = {
    firstName: "a",
    lastName: "a",
    address: "a",
    email: "a",
    personalId: "a",
    phone:"1",
    phoneMother:"1",
    phoneFather:"1",
    subscribe:true
  };
  constructor(private appService:AppService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("Submit");
    this.appService.createApplication(this.model).then((data)=>{
      console.log("Saved:"+data);
    });
  }
  clearForm(){
    console.log("Clear");
  }
}
