import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

export const routes:Routes=[
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
