import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Application} from "@sonkal/application-type"

//ToDO: this should be part of service or commons
export interface AppResponse {
  info: string,
  data, any
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
        let app = <Application>resp.data;
        return app.id;
      })
      .catch<string>(this.handleError);
  }

  listApplications(): Promise<Application[]> {
    const url = `${this.serviceUrl}/`;
    return this.http.get(url)
      .toPromise()
      .then((response) => {
        let resp = <AppResponse>response.json();
        return resp.data;
      })
      .catch(this.handleError);
  }

  handleError(error:any): any {
    //ToDo: how to handle errors
    return error;
  }
}
