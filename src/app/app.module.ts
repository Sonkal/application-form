import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppFormComponent } from './form/app-form.component';
import {AppService} from "./service/app-service";
import { ValidatePersonalId } from './form/validate.personal.id';
import {AppErrorHandler} from "./error/error-handler";
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    AppFormComponent,
    ValidatePersonalId,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AppService, ValidatePersonalId, {provide: ErrorHandler, useClass: AppErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
