import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {FileUploader, FileItem, FileUploaderOptions} from "ng2-file-upload";
import {Policy} from "../model/policy";
import {ObjectService} from "../object.service";
import {OssObject} from "../model/object";
import {ActivatedRoute} from "@angular/router";
import {RoomHeader} from "../model/roomHeader";
import {ImageExpress} from "../model/imageExpress";
import {fadeInOut} from "../../animation/fadeInOut";

@Component({
  selector: 'app-room-object',
  templateUrl: './room-object.component.html',
  styleUrls: ['./room-object.component.less'],
  animations:[fadeInOut]
})
export class RoomObjectComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  private timer:number;

  private errorMessage: string;
  private uploader:FileUploader = new FileUploader({});
  private objects:OssObject[] = [];
  show_mode:number=1;
  beforeLength:number=0;
  public hasBaseDropZoneOver:boolean = false;
  // file:File[];
  //
  // @ViewChild('fileUploader') input:ElementRef;
  imageExpress:ImageExpress;

  img_click(object:OssObject):void{
    this.imageExpress.nowImage=object;
    this.imageExpress.show=true;
  }


  dropfile(e:any){
    this.hasBaseDropZoneOver = e;
  }

  constructor(
    private objectService:ObjectService,
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {

    this.imageExpress=new ImageExpress;
    this.imageExpress.show=false;

    let id = parseInt(this.route.snapshot.params['id'],10);

    this.timer= setInterval(()=>{
      this.getObject(id);
    },5000);

    this.getObject(id);

  }
  befLength:number = 0;
  getObject(id)
  {

    this.objectService.getObject(id).subscribe(
      objects=>{
        let change:boolean = false;

        if(this.befLength!=objects.length)
        {
          change = true;
          this.befLength = objects.length;
        }

        if(!change)
        {
          objects.forEach((o:OssObject, index:number, objs:OssObject[])=>{
            this.objects.forEach((org:OssObject, index:number, objs:OssObject[])=> {
              if(o.order===org.order)
              {
                if(o.url!=org.url||o.isShow!=org.isShow)
                {
                  change = true;
                }
              }
            })
          });
        }

        if(change)
        {
          if(objects[0])
            this.roomHeader.headImg = objects[0].url;

          objects.forEach((o:OssObject)=>{
            let notHere = true;

            this.objects.forEach((org:OssObject, index:number, objs:OssObject[])=>{
              if(org.order===o.order)
              {
                if(o.url)
                {
                  objs[index]=o;
                }
                if(!o.url && o.isShow===false && !org.fileItem)
                {
                  objs[index] = o;
                }
                if(!o.url && o.isShow===false && org.fileItem)
                {
                  org.isShow = true;
                }

                notHere = false;

              }
              if(o.isShow === false)
              {
                notHere = true;
              }
            });

            if(notHere)
            {
              this.objects.push(o);
            }
          });
          let compare = function (obj1:OssObject, obj2:OssObject) {
            let val1 = obj1.order;
            let val2 = obj2.order;
            if (val1 < val2) {
              return -1;
            } else if (val1 > val2) {
              return 1;
            } else {
              return 0;
            }
          };
          this.objects.sort(compare);
          this.cal_width();
        }
      }
    );
  }

  private cal_width():void {
    let objnew:OssObject[]=[];

    this.objects.forEach((o:OssObject, index:number, objs:OssObject[])=>{
      if(o.isShow)
      {
        objnew.push(o);
      }
    });

    this.objects=objnew;

    let os = this.objects;
    let now_start = 0;
    let now_end = 1;
    let os_length = os.length;
    let isTree:boolean = false;
    let loop:boolean = true;
    let screenWidth = window.screen.availWidth;
    let targetWidth = 800;
    let maxHeight = 150;
    let last_loop:boolean = false;
    targetWidth = targetWidth<screenWidth ? targetWidth : screenWidth;
    let loop_three = false;

    if(this.objects.length>0)
    {
      if(this.objects.length<=2)
      {
        now_end = this.objects.length-1;
        last_loop = true;
      }

      while (loop)
      {
        if(last_loop)
          loop=false;

        let tempWidth:number[] = [];
        let trueWidth:number[] = [];
        let trueHeight:number[] = [];

        for(let i = now_start;i<=now_end;i++)
        {
          if(!os[i].width)
          {
            os[i].width = 450;
            os[i].height = 300;
            os[i].w_h = 450 / 300;
          }

          let scale = os[i].height / 300;
          tempWidth[i] = os[i].width /scale;
        }

        let countWidth = 0;
        for(let j = now_start;j<=now_end;j++)
        {
          countWidth+=tempWidth[j];
        }

        for(let i = now_start;i<=now_end;i++)
        {
          trueWidth[i] = targetWidth*tempWidth[i]/countWidth;
          trueHeight[i] = trueWidth[i]/os[i].width*os[i].height;
          if(trueHeight[i]>maxHeight && !loop_three &&!last_loop)
          {
            isTree = true;
            break;
          }
          else if(loop_three)
          {
            isTree = false;
          }
        }

        if(isTree)
        {
          now_end++;
          loop_three = true;
        }
        else {
          loop_three = false;
          for(let i = now_start;i<=now_end;i++)
          {
            os[i].showWidth = trueWidth[i];
            os[i].showHeight = trueHeight[i];
            os[i].isStart = false;
          }
          os[now_start].isStart=true;

          now_start = now_end + 1;
          now_end += 2;
          if(now_end > os_length-2)
          {
            now_end = os_length-1;
            isTree = true;
            loop_three = true;
            last_loop = true;
          }
        }
      }
    }
  }

  uploadOnclick(item:FileItem){
    let id = parseInt(this.route.snapshot.params['id'],10);
    this.objectService.getPolicy(id).subscribe(
      policy=> {
        this.upload(item,policy);
      },
      error=>this.errorMessage = <any>error
    );
  }

  test()
  {
    let id = parseInt(this.route.snapshot.params['id'],10);
    let fileItemList:FileItem[] = [];
    this.uploader.queue.forEach((file:FileItem,index:number,fileList:FileItem[])=>{
      if(!file.isReady&&!file.isError&&!file.isUploaded&&!file.isUploading&&!file.isCancel&&!file.isSuccess)
      {
        fileItemList.push(file);
      }
    });

    fileItemList.forEach((file:FileItem)=>{

      this.uploadOnclick(file);
    })
  }

  upload(item:FileItem,policy:Policy)
  {

    const point = item.file.name.lastIndexOf(".");

    const type = item.file.name.substr(point);

    item.file.name = Date.parse(new Date().toString()) + type;
    let form :FormData = new FormData();
    form.append("key",policy.dir + item.file.name);
    form.append("policy",policy.policy);
    form.append("OSSAccessKeyId",policy.accessid);
    form.append("success_action_status",200);
    form.append("callback",policy.callback);
    form.append("signature",policy.signature);

    item.formData = form;

    let o = new OssObject;

    o.order=policy.order;
     o.fileItem=item;
    o.isShow=true;

    this.preImg(item._file,o);

    this.objects.push(o);

    this.cal_width();

    const uploadOption:FileUploaderOptions = {
      url:policy.host
    };

    //TO-DO 发送请求标记正在上传
    this.uploader.setOptions(uploadOption);
    item.upload();
  }

  preImg(file:File,object:OssObject)
  {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (this:FileReader, ev: Event) {
      return object.src = this.result;
    }
  }

  @Input('roomHeader')
  roomHeader:RoomHeader;
}
