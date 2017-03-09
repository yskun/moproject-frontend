import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Room} from "./model/room";
import {Http, Response, Jsonp, URLSearchParams} from "@angular/http";
import {Config} from "../system/config";
import {Login} from "./model/login";

@Injectable()
export class RoomService {

  private api = 'room';

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

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  };

  constructor(private http: Http) {
  }

  getRoomInformation(id: number): Observable<Room> {
    return this.http.get(Config.backend + this.api + '/' + id).map((res: Response) => res.json()).catch(this.handleError);
  }

  postRoomInformation(room: Room): Observable<Room> {
    return this.http.post(Config.backend + this.api, room).map((res: Response) => res.json()).catch(this.handleError);
  }

  getCodeJudge(slug: string): Observable<any> {
    return this.http.post(Config.backend +'room/judge/isPassword', {slug: slug}).map((res: Response) => res.json()).catch(this.handleError);
  }

  postPasswordJudge(login:Login):Observable<any>{
    return this.http.post(Config.backend +'room/judge/login', login).map((res: Response) => res.json()).catch(this.handleError);

  }

  delRoom(login:Login):Observable<any>{
    return this.http.delete(Config.backend + this.api+'/'+login.slug+'/'+login.password).map((res: Response) => res.json()).catch(this.handleError);
  }

  postPassword(req:any):Observable<any>{
    return this.http.post(Config.backend +'room/setPassword', req).map((res: Response) => res.json()).catch(this.handleError);

  }
}
