import { Component, OnInit } from '@angular/core';
import {RoomService} from "../room.service";
import {ActivatedRoute} from "@angular/router";
import {Room} from "../model/room";
import {Policy} from "../model/policy";
import {ObjectService} from "../object.service";

@Component({
  selector: 'app-room-home',
  templateUrl: './room-home.component.html',
  styleUrls: ['./room-home.component.less']
})
export class RoomHomeComponent implements OnInit {

  errorMessage:string;
  room:Room;
  mode = 'Observable';
  constructor(
    private roomService:RoomService,
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.params['id'],10);
    this.roomService.getRoomInformation(id).subscribe(
      room=>this.room =room,
      error=>this.errorMessage = <any>error
    );
  }
}
