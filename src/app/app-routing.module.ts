import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

export const routes:Routes=[
  {
    path:'',
    redirectTo:'mothing',
    pathMatch:'full'
  },
  {
    path:'mothing',
    loadChildren:'app/mothing/mothing.module#MothingModule'
  },
  {
    path:'heroes',
    loadChildren:'app/heroes/heroes.module#HeroesModule'
  },
  {
    path:'room',
    loadChildren:'app/room/room.module#RoomModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
