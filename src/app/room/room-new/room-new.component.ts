import {Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import {Room} from "../model/room";
import {MdDialog, MdDialogRef} from "@angular/material";
import {ResultDialogComponent} from "./result-dialog/result-dialog.component";
import {RoomService} from "../room.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {fadeInOut} from "../../animation/fadeInOut";

@Component({
  selector: 'app-room-new',
  templateUrl: './room-new.component.html',
  styleUrls: ['./room-new.component.less'],
  animations:[fadeInOut]
})
export class RoomNewComponent implements OnInit {

  room:Room;
  ret:Room;
  dialogRef:MdDialogRef<ResultDialogComponent>;
  error:string;
  submit()
  {
      this.dialogRef=this.dialog.open(ResultDialogComponent,{
      disableClose:true
    });
    this.roomService.postRoomInformation(this.room).subscribe(
      room=> {
        if (room.slug) {
          //TO-DO redirect to new slug
          this.router.navigate(['/room/'+room.slug]);
          this.dialog.closeAll();
        }
      },
        error=> {
          this.dialogRef.componentInstance.dialog = error;
        }
    );
  }

  constructor(
    public dialog: MdDialog,
    private roomService:RoomService,
    private router: Router,
    private title:Title
  ) { }

  ngOnInit() {
    this.title.setTitle("新建");
    this.room = new Room;

  }

}
