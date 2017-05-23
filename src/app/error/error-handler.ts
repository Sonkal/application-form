import {ErrorHandler, Injectable, Injector, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AppError} from "../service/app-service";


@Injectable()
export class AppErrorHandler implements ErrorHandler, OnInit {

  constructor(private injector: Injector) {
  }


  ngOnInit(): void {
    console.log("Handler - init");
  }

  handleError(error) {
    console.log("handling error" + error);
    let router = this.injector.get(Router);
    let extras;
    if (error instanceof AppError){
      let er = <AppError>error;
      extras = {queryParams: {id: er.id, m: er.message}};
    }
    router.navigate(["error"], extras);
  }
}
