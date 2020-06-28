import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-duty-layout',
  templateUrl: './duty-layout.component.html',
  styleUrls: ['./duty-layout.component.scss']
})
export class DutyLayoutComponent implements OnInit {
  collapedSideBar: boolean;
  constructor() { }

  ngOnInit() {
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }
}
