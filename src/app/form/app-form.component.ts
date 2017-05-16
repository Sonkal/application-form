import { Component, OnInit } from '@angular/core';
import {AppService} from "../service/app-service";
import {Application} from "@sonkal/application-type"

class AppModel implements Application{
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  phoneMother: string;
  phoneFather: string;
  subscribe: boolean;
  id?: string | number;

  private persBefore: string;
  private persAfter: string;

  constructor(object:any){
    Object.assign(this,object);
  }

  set personalId(val:string){
    this.persBefore = val.split("/")[0];
    this.persAfter = val.split("/")[1];
  }

  get personalId():string{
    return this.persBefore+"/"+this.persAfter;
  }

}

@Component({
  selector: 'app-form',
  templateUrl: 'app-form.component.html',
  styleUrls: ['app-form.component.css']
})
export class AppFormComponent implements OnInit {

  model = new AppModel({
    firstName: "a",
    lastName: "a",
    address: "a",
    email: "a",
    personalId: "a",
    phone:"1",
    phoneMother:"1",
    phoneFather:"1",
    subscribe:true
  });

  personalIdGroup = {before:"123", after:"123"};

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
