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
import { RouterModule, Routes } from '@angular/router';
import { ApplicationPageComponent } from './application-page/application-page.component';
import {ErrorService} from "./error/error.service";

const appRoutes: Routes = [
  { path: '', component: ApplicationPageComponent },
  {
    path: 'error',
    pathMatch: 'prefix',
    component: ErrorComponent
  },
//ToDo: PNF  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AppFormComponent,
    ValidatePersonalId,
    ErrorComponent,
    ApplicationPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AppService, ValidatePersonalId,
    {provide: ErrorHandler, useClass: AppErrorHandler}, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
