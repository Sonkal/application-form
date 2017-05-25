import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Application} from "@sonkal/application-type";

//ToDO: this should be part of service or commons
export interface AppResponse {
  info: string,
  data: any
}


export class AppError {
  appErrMark = true;
  constructor(public id, public message?:string, public details?) {
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
    let reqId = AppService.generateErrorId();
    console.log("Request " + reqId + " starting ....");
    return this.http.post(url, app).toPromise()
      .then((response) => {
        let resp = <AppResponse>(response.json());
        console.log("Then of " + reqId +" info: "+resp.info);
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
    console.error("Error ID: " + errorId);

    if (error.type && error.status)
      return AppService.handleHttpReponseError(errorId, error);

    if (error.info)
      return AppService.handleAppError(errorId, error);

    return Promise.reject(new AppError(errorId));
  }

  /**
   * Handles HTTP error like this: {"status":504,"ok":false,"statusText":"Gateway Timeout","headers":{"Access-Control-Allow-Origin":["*"],"Date":["Thu"," 25 May 2017 11:50:57 GMT"],"Connection":["keep-alive"],"X-Powered-By":["Express"],"Transfer-Encoding":["chunked"]},"type":2,"url":"http://localhost:4200/api/applications/","_body":"Error occured while trying to proxy to: localhost:4200/api/applications/"}
   */
  static handleHttpReponseError(errorId: string, error: Response) {
    let m = "";
    if (error.url)
      m += error.url + ", ";
    if (error.status + ", ")
      m += error.status + ", ";
    if (error.statusText)
      m += error.statusText + ", ";
    m = m.substring(0, m.length - 2);
    let body = error.text();
    return Promise.reject(new AppError(errorId, m, body));
  }

  //ToDo: maybe this is obsolete, errors move on the wire as HTTP errors not app errors
  static handleAppError(errorId: string, error: any) {
    let details = "";
    if (typeof error.data === 'string')
      details =  error.data;
    else
      details = JSON.stringify(error.data);
    return Promise.reject(new AppError(errorId, error.info, details));
  }

  static generateErrorId() {
    return Math.round((Math.pow(16, 16) - Math.random() * Math.pow(16, 16))).toString(16).slice(1);
  }
}
