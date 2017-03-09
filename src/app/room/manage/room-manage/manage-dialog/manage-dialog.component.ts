import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-manage-dialog',
  templateUrl: './manage-dialog.component.html',
  styleUrls: ['./manage-dialog.component.less']
})
export class ManageDialogComponent implements OnInit {

  public dialog:string;
  constructor(public dialogRef: MdDialogRef<ManageDialogComponent>) { }

  ngOnInit() {
  }

}
