import {ErrorHandler, Injectable, Injector, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AppError} from "../service/app-service";
import {ErrorService} from "./error.service";


@Injectable()
export class AppErrorHandler implements ErrorHandler, OnInit {

  constructor(private injector: Injector, private es:ErrorService) {
  }


  ngOnInit(): void {
    console.log("Handler - init");
  }

  handleError(error) {
    console.log("handling error" + error);
    let router = this.injector.get(Router);
    if (error.rejection && error.rejection instanceof AppError) {
      let er = <AppError>(error.rejection);
      this.es.error = er;
    } else {
      console.error("Missing logic for error:"+error);
      console.error(error);
      this.es.error = new AppError("Internall Error", );
    }
    if (router.isActive("error",false))
      return;
    //Without this hack, it does not work :-(
    setTimeout(() => {
      router.navigate(["error"]);
    });
  }
}
