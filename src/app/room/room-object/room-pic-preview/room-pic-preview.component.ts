import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {ImageExpress} from "../../model/imageExpress";
import {fadeInOut} from "../../../animation/fadeInOut";
import {MdSnackBar, MdSnackBarRef} from "@angular/material";
import {RoomPpSnackbarComponent} from "./room-pp-snackbar/room-pp-snackbar.component";

@Component({
  selector: 'app-room-pic-preview',
  templateUrl: './room-pic-preview.component.html',
  styleUrls: ['./room-pic-preview.component.less'],
  animations:[fadeInOut]
})
export class RoomPicPreviewComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
  }

  isMove:boolean;

  constructor(public snackBar: MdSnackBar) { }

  blackClick()
  {
    this.imageExpress.show=false;
  }

  screenWidth:number;
  screenHeight:number;

  ngOnInit() {
    this.judge_ua();
    this.isMove = false;
    this.screenHeight = document.documentElement.clientHeight;
    this.screenWidth = document.documentElement.clientWidth;

    this.imageExpress.showX=0;
    this.imageExpress.showY=0;
    this.imageExpress.showScale = 1;
    this.imageExpress.scale=1;

    let targetWidth:number;
    if(this.screenWidth>800)
    {
      targetWidth=800;
    }
    else {
      targetWidth = this.screenWidth;
    }

    let scale = this.imageExpress.nowImage.width / targetWidth;
    this.imageExpress.wWidth = targetWidth;
    this.imageExpress.wHeight = this.imageExpress.nowImage.height / scale;

    let hScale = this.imageExpress.nowImage.height / this.screenHeight;
    this.imageExpress.hHeight = this.screenHeight;
    this.imageExpress.hWidth = this.imageExpress.nowImage.width / hScale;


    this.imageExpress.showWidth = this.imageExpress.wWidth ;
    this.imageExpress.showHeight = this.imageExpress.wHeight;

    this.imageExpress.showX = (this.screenWidth-this.imageExpress.showWidth) /2;
    this.imageExpress.showY = (this.screenHeight-this.imageExpress.showHeight) /2;

    this.imageExpress.offsetX= this.imageExpress.showX;
    this.imageExpress.offsetY=this.imageExpress.showY;
  }

  @Input()
  imageExpress:ImageExpress;

  panend(action:any)
  {
    this.isMove =false;
    this.imageExpress.offsetX=this.imageExpress.showX;
    this.imageExpress.offsetY=this.imageExpress.showY;
  }

  // action triggered when user swipes
  panmove(action:any) {
    // out of range

      this.isMove =true;
      this.imageExpress.showX=this.imageExpress.offsetX+action.deltaX;
      this.imageExpress.showY=this.imageExpress.offsetY+action.deltaY;

  }
  sb:MdSnackBarRef<RoomPpSnackbarComponent>;
  mode:boolean = true;
  press(action:any)
  {
    let sb = this.snackBar.openFromComponent(RoomPpSnackbarComponent, {
      duration: 3000,
    });


    sb.instance.url = this.imageExpress.nowImage.url;
  }

  iphone_mode:boolean = false;

  judge_ua(){
    if(navigator.userAgent.indexOf("iPhone")>=0 && navigator.userAgent.indexOf("MicroMessenger")<0)
    {
      this.iphone_mode  = true;
    }

  };


  click(action:any){
    if(action.tapCount===2)
    {
      if(this.imageExpress.showScale!=1)
      {
        this.imageExpress.showScale = 1;
        if(this.iphone_mode)
        {
          this.imageExpress.showX = (this.screenWidth-this.imageExpress.showWidth*this.imageExpress.showScale) /2;
          this.imageExpress.showY = (this.screenHeight-this.imageExpress.showHeight*this.imageExpress.showScale) /2;
        } else {
          this.imageExpress.showX = (this.screenWidth-this.imageExpress.showWidth) /2;
          this.imageExpress.showY = (this.screenHeight-this.imageExpress.showHeight) /2;
        }
        this.imageExpress.offsetX= this.imageExpress.showX;
        this.imageExpress.offsetY=this.imageExpress.showY;


      }
      else{
        this.imageExpress.showScale = this.imageExpress.hWidth / this.imageExpress.showWidth;

        if(this.iphone_mode)
        {
          this.imageExpress.showX = (this.screenWidth-this.imageExpress.showWidth*this.imageExpress.showScale) /2;
          this.imageExpress.showY = (this.screenHeight-this.imageExpress.showHeight*this.imageExpress.showScale) /2;
        } else {
          this.imageExpress.showX = (this.screenWidth-this.imageExpress.showWidth) /2;
          this.imageExpress.showY = (this.screenHeight-this.imageExpress.showHeight) /2;
        }

        this.imageExpress.offsetX= this.imageExpress.showX;
        this.imageExpress.offsetY=this.imageExpress.showY;
      }
    }
  }

  pinchout(action:any)
  {
    this.isMove =true;
    this.imageExpress.showScale =this.imageExpress.scale * action.scale;
    if(this.iphone_mode)
    {
      this.imageExpress.showX = (this.screenWidth-this.imageExpress.showWidth*this.imageExpress.showScale) /2;
      this.imageExpress.showY = (this.screenHeight-this.imageExpress.showHeight*this.imageExpress.showScale) /2;
    }
  }
  pinchin(action:any)
  {
    this.isMove =true;
    if(this.imageExpress.showScale<=1)
    {
      this.imageExpress.showScale=1;
    }
    else {
      this.imageExpress.showScale =this.imageExpress.scale * action.scale;
    }
    if(this.iphone_mode)
    {
      this.imageExpress.showX = (this.screenWidth-this.imageExpress.showWidth*this.imageExpress.showScale) /2;
      this.imageExpress.showY = (this.screenHeight-this.imageExpress.showHeight*this.imageExpress.showScale) /2;
    }
  }
  pinchend(action:any)
  {
    this.isMove =false;
    this.imageExpress.scale = this.imageExpress.showScale;
    this.imageExpress.offsetX= this.imageExpress.showX;
    this.imageExpress.offsetY=this.imageExpress.showY;
  }
}
