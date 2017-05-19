import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Application} from "@sonkal/application-type"

//ToDO: this should be part of service or commons
export interface AppResponse {
  statusCode: number,
  errorId: number,
  data: {
    info: string,
    data: any
  }
}


@Injectable()
export class AppService {

  //ToDo: change this to http://application-service:3000/api/applications
  serviceUrl = "http://localhost:4200/api/applications";

  constructor(private http: Http) {
  }

  createApplication(app: Application): Promise<string> {
    const url = `${this.serviceUrl}/`;
    return this.http.post(url, app).toPromise()
      .then((response) => {
        let resp = (<AppResponse>response.json());
        let code = resp.statusCode;
        if (code >= 300) {
          AppService.handleError(resp.data);
        }
        let app = <Application>resp.data.data;
        return app.id;
      })
      .catch<string>(AppService.handleError);
  }

  listApplications(): Promise<Application[]> {
    const url = `${this.serviceUrl}/`;
    return this.http.get(url)
      .toPromise()
      .then((response) => {
        let resp = <AppResponse>response.json();
        return resp.data;
      })
      .catch(AppService.handleError);
  }

  static handleError(error: any): any {
    console.error(error);
    let errorId = AppService.generateErrorId();
    console.error("Error ID: "+errorId);
    throw new Error("Chyba "+errorId);
  }

  static generateErrorId() {
    return Math.round((Math.pow(16, 16) - Math.random() * Math.pow(16, 16))).toString(16).slice(1);
  }
}
