import {Component, OnInit, OnDestroy, style, animate, transition, state, trigger} from '@angular/core';
import {Login} from "../../model/login";
import {Subject, Observable} from "rxjs";
import {RoomService} from "../../room.service";
import {Room} from "../../model/room";
import {MdDialogRef, MdDialog} from "@angular/material";
import {ManageDialogComponent} from "../room-manage/manage-dialog/manage-dialog.component";
import {Title} from "@angular/platform-browser";
import {fadeInOut, flyIn} from "../../../animation/fadeInOut";
// import {debounceTime} from "rxjs/operator/debounceTime";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  animations:[
    fadeInOut,flyIn
  ]
})
export class LoginComponent implements OnInit,OnDestroy{

  private login:Login = new Login;
  public password:string;
  // private codeJudgeSteam = new Subject<string>();
  password_state:number;
  mode:boolean=false;
  dialogRef:MdDialogRef<ManageDialogComponent>;
  modeChange_:boolean = false;
  margin:number;
  ngOnDestroy(): void {
  }
  modeChange(e:any)
  {
    if(e.fromState != "void")
    {
      this.modeChange_ = true;
    }
  }
  constructor(
    private roomService:RoomService,
    public dialog: MdDialog,
    private title:Title
  )
  {
    // this.password_state = this.codeJudgeSteam
    //   .debounceTime(300)
    //   .distinctUntilChanged()
    //   .switchMap(v=>this.roomService.getCodeJudge(v));
    this.title.setTitle("管理");

  }

  ngOnInit() {
    this.margin = (window.screen.availHeight - 410)/2;
  }

  code(term:string)
  {
    this.roomService.getCodeJudge(term).subscribe(
      state=>this.password_state = state.state
    );
    // this.codeJudgeSteam.next(term);
  }

  submit()
  {
    this.login.password= this.password;
    this.roomService.postPasswordJudge(this.login).subscribe(
      state=> {
        if(state.state===0)
        {

          this.mode = true;
        }
        else if(state.state===1)
        {
          this.dialogRef = this.dialog.open(ManageDialogComponent);
          this.dialogRef.componentInstance.dialog='密码错误';
        }
      }
    );
  }
}
