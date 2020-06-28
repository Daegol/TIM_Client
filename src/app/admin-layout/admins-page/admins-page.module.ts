import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminsListComponent} from './components/admins-list/admins-list.component';
import {AdminsPageRoutingModule} from './admins-page-routing.module';
import {ButtonsModule, IconsModule, InputsModule, MDBBootstrapModule, TableModule, WavesModule} from 'angular-bootstrap-md';
import {PageHeaderModule} from '../../shared/modules';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [AdminsListComponent],
  imports: [
    CommonModule,
    AdminsPageRoutingModule,
    PageHeaderModule,
    TableModule,
    IconsModule,
    WavesModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    InputsModule
  ]
})
export class AdminsPageModule { }
