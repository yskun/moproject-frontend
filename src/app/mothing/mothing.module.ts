import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MaterialModule} from '@angular/material';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'about',
        component: AboutComponent
      }
    ]),
    MaterialModule.forRoot()
  ],
  declarations: [
    HomeComponent,
    AboutComponent
  ]
})
export class MothingModule { }
