import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import {PageHeaderModule} from "../../shared/modules";
import {FormsModule} from "@angular/forms";
import {IconsModule, TableModule} from "angular-bootstrap-md";


@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    PageHeaderModule,
    FormsModule,
    IconsModule,
    TableModule
  ]
})
export class ReportsModule { }
