
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoldiersPageRoutingModule } from './soldiers-page-routing.module';
import { PageHeaderModule } from 'src/app/shared';
import { TableModule, IconsModule, WavesModule, ButtonsModule, MDBBootstrapModule, InputsModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SoldiersListComponent} from './components/soldiers-list/soldiers-list.component';


@NgModule({
  declarations: [SoldiersListComponent],
  imports: [
    CommonModule,
    SoldiersPageRoutingModule,
    PageHeaderModule,
    TableModule,
    IconsModule,
    WavesModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    InputsModule
  ],
})
export class SoldiersPageModule { }
