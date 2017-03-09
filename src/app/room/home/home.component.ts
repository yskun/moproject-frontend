import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {fadeInOut} from "../../animation/fadeInOut";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  animations:[fadeInOut]
})
export class HomeComponent implements OnInit {

  constructor(private title:Title) { }

  ngOnInit() {
    this.title.setTitle("房间·某物计划");
  }

}
