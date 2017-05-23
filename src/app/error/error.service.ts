import {Injectable} from "@angular/core";
import {AppError} from "../service/app-service";
@Injectable()
export class ErrorService{
  public error: AppError;
}
