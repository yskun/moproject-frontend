import { Component, OnInit } from '@angular/core';
import {RoomService} from "../room.service";
import {ActivatedRoute} from "@angular/router";
import {Room} from "../model/room";
import {RoomHeader} from "../model/roomHeader";
import {Title} from "@angular/platform-browser";
import {flyIn, fadeInOut} from "../../animation/fadeInOut";

@Component({
  selector: 'app-room-home',
  templateUrl: './room-home.component.html',
  styleUrls: ['./room-home.component.less'],
  animations:[flyIn,fadeInOut]
})



export class RoomHomeComponent implements OnInit {

  errorMessage:string;
  room:Room;
  suggest_card:boolean = true;
  suggest_card_finish:boolean = false;

  password:string;
  private timer: number;
  roomHeader:RoomHeader;

  reciveString:string;
  sm:boolean=false;
  constructor(
    private roomService:RoomService,
    private route:ActivatedRoute,
    private title:Title
  ) { }

  screenHeight:number;

  ngOnInit() {
    this.screenHeight = window.screen.availHeight;

    this.roomHeader={
      headImg: null
    };
    let id = parseInt(this.route.snapshot.params['id'],10);
    this.roomService.getRoomInformation(id).subscribe(
      room=>
      {
        this.room =room;
        this.title.setTitle(room.name);
      },
      error=>this.errorMessage = <any>error
    );
  }

  close_suggest_card()
  {
    this.suggest_card=false;
  }

  submit_ps()
  {
    this.sm=true;
    let req={
      slug:this.room.slug,
      password:this.password
    };
    this.roomService.postPassword(req).subscribe(
      state =>
      {
        this.suggest_card_finish=true;
        if(state.state===0)
        {
          this.reciveString = '完成';
        }
        else {
          this.reciveString = '您已设置密码';
        }
        this.timer= setInterval(()=>{
          this.suggest_card=false;
          clearInterval(this.timer);
        },5000);
      }
    );
  }
}
