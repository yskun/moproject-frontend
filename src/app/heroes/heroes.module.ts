

import {Routes, RouterModule} from "@angular/router";
import {HeroesComponent} from "./heroes/heroes.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {HeroService} from "./hero.service";
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import {FormsModule} from "@angular/forms";

const heroRoutes:Routes = [
  {
    path:'',
    component:HeroesComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(heroRoutes)
  ],
  declarations: [
    HeroesComponent,
    HomeComponent,
    DetailComponent
  ],

  providers:[HeroService]
})

export class HeroesModule { }
