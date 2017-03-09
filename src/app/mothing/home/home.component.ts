import { Component, OnInit } from '@angular/core';
import {fadeInOut} from "../../animation/fadeInOut";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  animations:[fadeInOut]

})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
