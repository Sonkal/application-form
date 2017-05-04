import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: 'app-form.component.html',
  styleUrls: ['app-form.component.css']
})
export class AppFormComponent implements OnInit {

  model = {
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    personalId: "",
  };
  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("Submit");
  }
}
