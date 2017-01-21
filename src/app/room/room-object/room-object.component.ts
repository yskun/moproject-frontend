import {Component, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';
import {FileUploader, FileItem, FileUploaderOptions} from "ng2-file-upload";
import {Policy} from "../model/policy";
import {ObjectService} from "../object.service";
import Timer = NodeJS.Timer;
import {Object} from "../model/object";
import {Room} from "../model/room";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-room-object',
  templateUrl: './room-object.component.html',
  styleUrls: ['./room-object.component.less']
})
export class RoomObjectComponent implements OnInit {

  private timer:Timer;

  private policy:Policy;
  private errorMessage: string;
  private uploader:FileUploader = new FileUploader({});
  private uploadInit:Boolean = false;
  private objects:Object[];

  constructor(
    private objectService:ObjectService,
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.params['id'],10);
    this.objectService.getPolicy().subscribe(
      policy=> this.policy = policy,
      error=>this.errorMessage = <any>error
    );
    this.timer= setInterval(()=>{
      this.objectService.getObject(id).subscribe(
        object=> this.objects= object
      );
    },5000);
    this.objectService.getObject(id).subscribe(
      object=> this.objects= object
    );
  }

  uploadOnclick(item:FileItem){
    const time = Date.parse(new Date().toString());

    if(this.policy.expire-time<10000)
    {
      this.objectService.getPolicy().subscribe(
        policy=> {
          this.policy = policy;
          this.upload(item);
        },
        error=>this.errorMessage = <any>error
      );
    }
    else
    {
      this.upload(item);
    }
  }

  upload(item:FileItem)
  {
    const uploadOption:FileUploaderOptions = {
      url:this.policy.host,
      additionalParameter:{
        key:this.policy.dir+Date.parse(new Date().toString())+item.file.name,
        policy:this.policy.policy,
        OSSAccessKeyId:this.policy.accessid,
        success_action_status:200,
        signature:this.policy.signature
      }
    };

    //TO-DO 发送请求标记正在上传
    this.uploader.setOptions(uploadOption);
    item.upload();
  }

}
