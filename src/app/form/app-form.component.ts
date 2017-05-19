import { Component, OnInit } from '@angular/core';
import {AppService} from "../service/app-service";
import {Application} from "@sonkal/application-type"

class AppModel implements Application{
  firstName: string;
  lastName: string;
  address: {
    street: string,
    city: string,
    postCode: string,
  };
  email: string;
  phone: string;
  personalId: string;
  phoneMother: string;
  phoneFather: string;
  subscribe: boolean;
  id?: string | number;

  constructor(object:any){
    Object.assign(this,object);
  }
  setPersonalId(before:string, after:string){
    this.personalId = before+"/"+after;
  }
}

@Component({
  selector: 'app-form',
  templateUrl: 'app-form.component.html',
  styleUrls: ['app-form.component.css']
})
export class AppFormComponent implements OnInit {

  //ToDo: remove silly initial values
  model = new AppModel({
    firstName: "a",
    lastName: "a",
    address: {street:"a", city:"a",postCode:"11111"},
    email: "a",
    personalId: "111111/1111",
    phone:"1",
    phoneMother:"1",
    phoneFather:"1",
    subscribe:true
  });

  personalIdGroup = {before:"111111", after:"1111"};

  constructor(private appService:AppService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("Submit");
    this.model.setPersonalId(this.personalIdGroup.before,this.personalIdGroup.after);
    this.appService.createApplication(this.model).then((data)=>{
      console.log("Saved:"+data);
    }).catch((err)=>{
      console.log("Save - caught error:"+err);
    });
  }
  clearForm(){
    console.log("Clear");
  }
}
