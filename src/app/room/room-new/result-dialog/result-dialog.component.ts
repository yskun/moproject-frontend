import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.less']
})
export class ResultDialogComponent implements OnInit {
  public dialog:string;
  constructor(public dialogRef: MdDialogRef<ResultDialogComponent>) {}
  ngOnInit() {
  }

}
