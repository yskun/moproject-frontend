import {Component, OnInit, Input} from '@angular/core';
import {Login} from "../../model/login";
import {RoomService} from "../../room.service";
import {MdDialogRef, MdDialog} from "@angular/material";
import {ManageDialogComponent} from "./manage-dialog/manage-dialog.component";
import {Router} from "@angular/router";
import {flyIn} from "../../../animation/fadeInOut";

@Component({
  selector: 'app-room-manage',
  templateUrl: './room-manage.component.html',
  styleUrls: ['./room-manage.component.less'],
  animations:[flyIn]
})
export class RoomManageComponent implements OnInit {

  dialogRef:MdDialogRef<ManageDialogComponent>;
  private timer: any;

  constructor(
    private roomService:RoomService,
    public dialog: MdDialog,
    private router:Router
  ) { }

  ngOnInit() {
  }

  delete_room()
  {
    this.roomService.delRoom(this.login).subscribe(
      ret=>{
        if(ret.state===0)
        {
          this.dialogRef = this.dialog.open(ManageDialogComponent,{
            disableClose:true
          });
          this.timer= setInterval(()=>{
            this.router.navigate(['/room']);
            this.dialog.closeAll();
            clearInterval(this.timer);
          },5000);
          this.dialogRef.componentInstance.dialog='成功';

        }
        else if(ret.state===1)
        {
          this.dialogRef = this.dialog.open(ManageDialogComponent);
          this.dialogRef.componentInstance.dialog='无法删除';
        }
      }
    );
  }

  @Input()
  login:Login;
}
