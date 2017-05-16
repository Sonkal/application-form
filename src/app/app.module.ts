import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppFormComponent } from './form/app-form.component';
import {AppService} from "./service/app-service";
import { ValidatePersonalId } from './form/validate.personal.id';

@NgModule({
  declarations: [
    AppComponent,
    AppFormComponent,
    ValidatePersonalId
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AppService, ValidatePersonalId],
  bootstrap: [AppComponent]
})
export class AppModule { }
