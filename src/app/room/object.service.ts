import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Policy} from "./model/policy";
import {Config} from "../system/config";
import {FileUploader, FileItem} from "ng2-file-upload";
import {Object} from "./model/object";

@Injectable()
export class ObjectService {
  private policy_api = 'object/policy';
  private object_api = 'object/room/';
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

  constructor(private http:Http) { }

  getPolicy():Observable<Policy>{
    return this.http.get(Config.backend+this.policy_api).map((res:Response)=>res.json()).catch(this.handleError);
  }

  getObject(colId:number):Observable<Object[]>{
    return this.http.get(Config.backend+this.object_api+colId).map((res:Response)=>res.json()).catch(this.handleError);
  }

}
