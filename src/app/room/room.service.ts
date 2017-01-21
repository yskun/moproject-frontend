import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Room} from "./model/room";
import {Http, Response} from "@angular/http";
import {Config} from "../system/config";

@Injectable()
export class RoomService {

  private api = 'room/';

  private handleError(error: Response|any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  };

  private extractData(res: Response){
    let body = res.json();
    return body.data || { };
  };
  constructor(private http:Http) { }

  getRoomInformation(id:number):Observable<Room>{
    return this.http.get(Config.backend+this.api+id).map((res:Response)=>res.json()).catch(this.handleError);
  }


}
