import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettlementRoutingModule } from './settlement-routing.module';
import { SettlementComponent } from './settlement.component';


@NgModule({
  declarations: [SettlementComponent],
  imports: [
    CommonModule,
    SettlementRoutingModule
  ]
})
export class SettlementModule { }
