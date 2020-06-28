import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyPageRoutingModule } from './company-page-routing.module';
import { CompanyPageComponent } from './company-page.component';
import { PageHeaderModule } from './../../shared';
import { TableModule, IconsModule, WavesModule, ButtonsModule, MDBBootstrapModule, InputsModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCompanyComponent } from './add-company/add-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [CompanyPageComponent, AddCompanyComponent, EditCompanyComponent],
  imports: [
    CommonModule,
    CompanyPageRoutingModule,
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
export class CompanyPageModule { }
