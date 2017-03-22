import {Component, OnInit} from '@angular/core';
import {fadeInOut} from './animation/fadeInOut';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInOut]
})

export class AppComponent implements OnInit {
  ngOnInit(): void {
  }


  constructor() {

  }

}



