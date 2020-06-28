import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DutyLayoutRoutingModule } from './duty-layout-routing.module';
import { DutyLayoutComponent } from './duty-layout.component';
import {HeaderComponent} from "./components/header/header.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {AlertModule} from "../shared/modules";


@NgModule({
  declarations: [DutyLayoutComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    DutyLayoutRoutingModule,
    NgbDropdownModule,
    AlertModule,
  ]
})
export class DutyLayoutModule { }
