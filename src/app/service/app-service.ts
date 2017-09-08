import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Application} from "@sonkal/application-type";
import {environment} from "../../environments/environment";

//ToDO: this should be part of service or commons
export interface AppResponse {
  info: string,
  data: any
}

@Injectable()
export class AppService {

  static serviceUrl = environment.appServiceUrl;

  constructor(private http: Http) {
  }

  createApplication(app: Application): Promise<string> {
    const url = `${AppService.serviceUrl}/`;
    let reqId = AppError.generateId();
    console.log("Request " + reqId + " starting ....");
    return this.http.post(url, app).toPromise()
      .then((response) => {
        let resp = <AppResponse>(response.json());
        console.log("Then of " + reqId + " info: " + resp.info);
        return resp.data._id;
      })
      .catch<string>((err) => {
        console.log("catch of " + reqId);
        if (err instanceof AppError)
          return Promise.reject(err);
        return AppService.handleError(err);
      });
  }

  listApplications(): Promise<Application[]> {
    const url = `${AppService.serviceUrl}/`;
    return this.http.get(url)
      .toPromise()
      .then((response) => {
        let resp = <AppResponse>response.json();
        return resp.data;
      })
      .catch(AppService.handleError);
  }

  static handleError(error: any): any {

    if (error.type && error.status)
      return Promise.reject(AppError.fromHttpError(error));

    if (error.info)
      return Promise.reject(AppError.fromAppServiceError(error));

    return Promise.reject(AppError.fromGenericError(error));
  }


}



export class AppError {
  appErrMark = true;

  constructor(public id, public message?: string, public details?) {
  }

  toString():string{
    return `AppError(${this.id}): ${this.message}\n${this.details}`;
  }

  /**
   * Handles HTTP error like this: {"status":504,"ok":false,"statusText":"Gateway Timeout","headers":{"Access-Control-Allow-Origin":["*"],"Date":["Thu"," 25 May 2017 11:50:57 GMT"],"Connection":["keep-alive"],"X-Powered-By":["Express"],"Transfer-Encoding":["chunked"]},"type":2,"url":"http://localhost:4200/api/applications/","_body":"Error occured while trying to proxy to: localhost:4200/api/applications/"}
   */
  static fromHttpError(httpError): AppError {
    let id = AppError.generateId();
    console.error(httpError);
    console.error("Error ID: " + id);

    let m = "";
    if (httpError.url)
      m += httpError.url + ", ";
    if (httpError.status + ", ")
      m += httpError.status + ", ";
    if (httpError.statusText)
      m += httpError.statusText + ", ";
    m = m.substring(0, m.length - 2);
    let body = httpError.text();
    return new AppError(id, m, body);
  }

  //ToDo: maybe this is obsolete, errors move on the wire as HTTP errors not app errors
  static fromAppServiceError(error: any) {
    let id = AppError.generateId();
    console.error(error);
    console.error("Error ID: " + id);

    let details = "";
    if (typeof error.data === 'string')
      details = error.data;
    else
      details = JSON.stringify(error.data);
    return new AppError(id, error.info, details);
  }

  static fromGenericError(error: any) {
    let id = AppError.generateId();
    console.error(error);
    console.error("Error ID: " + id);

    return new AppError(id, error.rejection ? error.rejection.message : error.message, JSON.stringify(error));
  }

  static generateId() {
    return Math.round((Math.pow(16, 16) - Math.random() * Math.pow(16, 16))).toString(16).slice(1);
  }
}
