import {BrowserModule} from "@angular/platform-browser";
import {NgModule, ErrorHandler} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {AppFormComponent} from "./form/app-form.component";
import {AppService} from "./service/app-service";
import {ValidatePersonalId} from "./form/validate.personal.id";
import {AppErrorHandler} from "./error/error-handler";
import {ErrorComponent} from "./error/error.component";
import {RouterModule, Routes} from "@angular/router";
import {ApplicationPageComponent} from "./application-page/application-page.component";
import {ErrorService} from "./error/error.service";
import {SuccessComponent} from "./success/success.component";
import {SuccessService} from "./success/success-service";

const appRoutes: Routes = [
  {
    path: 'form',
    component: ApplicationPageComponent,
    children: [
      {
        path: '',
        component: AppFormComponent,
        outlet: "form"
      }
    ]
  },
  {
    path: 'success',
    component: ApplicationPageComponent,
    children: [
      {
        path: '',
        component: SuccessComponent,
        outlet: "form"
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'form'
  },
  {
    path: 'error',
    pathMatch: 'prefix',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: 'form'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AppFormComponent,
    ValidatePersonalId,
    ErrorComponent,
    ApplicationPageComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AppService, ValidatePersonalId, ErrorService, SuccessService,
    {provide: ErrorHandler, useClass: AppErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
