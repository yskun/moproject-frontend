/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RoomObjectComponent } from './room-object.component';

describe('RoomObjectComponent', () => {
  let component: RoomObjectComponent;
  let fixture: ComponentFixture<RoomObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
