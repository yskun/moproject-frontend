import {Component, OnInit, Input} from '@angular/core';
import {Hero} from "../hero";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  hero : Hero;
}
