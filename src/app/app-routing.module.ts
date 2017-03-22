import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/mothing/mothing.module#MothingModule'
  },
  {
    path: 'room',
    loadChildren: 'app/room/room.module#RoomModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
