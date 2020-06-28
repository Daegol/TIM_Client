
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommanderPageRoutingModule } from './commander-page-routing.module';
import { PageHeaderModule } from 'src/app/shared';
import { TableModule, IconsModule, WavesModule, ButtonsModule, MDBBootstrapModule, InputsModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommanderListComponent} from './components/commander-list/commander-list.component';


@NgModule({
  declarations: [CommanderListComponent],
  imports: [
    CommonModule,
    CommanderPageRoutingModule,
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
export class CommandersPageModule { }
