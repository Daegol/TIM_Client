import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettlementRoutingModule } from './settlement-routing.module';
import { SettlementComponent } from './settlement.component';
import {PageHeaderModule} from "../../shared/modules";
import {FormsModule} from "@angular/forms";
import {IconsModule, TableModule} from "angular-bootstrap-md";


@NgModule({
  declarations: [SettlementComponent],
  imports: [
    CommonModule,
    SettlementRoutingModule,
    PageHeaderModule,
    FormsModule,
    TableModule,
    IconsModule
  ]
})
export class SettlementModule { }
