import {Injectable} from "@angular/core";
@Injectable()
export class SuccessService{
  id:string;
  width: number;
  height: number;

  saveData(id, width, height):void{
    console.log(`id=${id} width=${width} height=${height}`);
    this.id = id;
    this.width = width;
    this.height = height;
  }
}
