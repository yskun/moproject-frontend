import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomHomeComponent } from './room-home/room-home.component';
import {RoomService} from "./room.service";
import {RouterModule} from "@angular/router";
import {ObjectService} from "./object.service";
import { RoomObjectComponent } from './room-object/room-object.component';
import {FileUploadModule} from "ng2-file-upload";
import { HomeComponent } from './home/home.component';
import {MaterialModule} from "@angular/material";
import { RoomNewComponent } from './room-new/room-new.component';
import {FormsModule} from "@angular/forms";
import { ResultDialogComponent } from './room-new/result-dialog/result-dialog.component';
import {LoginComponent} from "./manage/login/login.component";
import {HttpModule} from "@angular/http";
import { RoomManageComponent } from './manage/room-manage/room-manage.component';
import { ManageDialogComponent } from './manage/room-manage/manage-dialog/manage-dialog.component';
import { RoomPicPreviewComponent } from './room-object/room-pic-preview/room-pic-preview.component';
import { RoomPpSnackbarComponent } from './room-object/room-pic-preview/room-pp-snackbar/room-pp-snackbar.component';
// import '../rxjs-operators';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
    RouterModule.forChild([
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'new',
        component:RoomNewComponent
      },
      {
        path:'manage',
        component:LoginComponent
      },
      {
        path: ':id',
        component: RoomHomeComponent
      }]),
    MaterialModule.forRoot(),
  ],
  declarations: [
    RoomHomeComponent,
    RoomObjectComponent,
    HomeComponent,
    RoomNewComponent,
    ResultDialogComponent,
    LoginComponent,
    RoomManageComponent,
    ManageDialogComponent,
    RoomPicPreviewComponent,
    RoomPpSnackbarComponent],
  providers:[
    RoomService,
    ObjectService
  ],
  bootstrap:[ResultDialogComponent,ManageDialogComponent,RoomPpSnackbarComponent]
})
export class RoomModule { }
