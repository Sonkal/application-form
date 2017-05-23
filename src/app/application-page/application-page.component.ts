import {Component, OnInit, Injector} from '@angular/core';
import {Router} from "@angular/router";
import {AppError} from "../service/app-service";

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.css']
})
export class ApplicationPageComponent implements OnInit {

  constructor(private injector: Injector) {
  }

  ngOnInit() {
  }

  navigate(){
    this.handleError(new AppError(1,"m"));
  }
  handleError(error) {
    console.log("handling error" + error);
    let router = this.injector.get(Router);
    let extras;
    if (error instanceof AppError){
      console.log("Yes, instance");
      let er = <AppError>error;
      extras = {queryParams: {id: er.id, m: er.message}};
    }
    console.log("Routing:"+JSON.stringify(extras));
    router.navigate(["error"], extras).then((ok) => {
      console.log("Navigation result:" + ok);
    });
  }

}
