import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomHomeComponent } from './room-home/room-home.component';
import {RoomService} from "./room.service";
import {RouterModule} from "@angular/router";
import {ObjectService} from "./object.service";
import { RoomObjectComponent } from './room-object/room-object.component';
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    RouterModule.forChild([{
      path:':id',
      component:RoomHomeComponent
    }])
  ],
  declarations: [RoomHomeComponent, RoomObjectComponent],
  providers:[
    RoomService,
    ObjectService
  ]
})
export class RoomModule { }
