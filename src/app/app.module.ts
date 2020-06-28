import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from './shared';
import { MDBBootstrapModule, ModalModule } from 'angular-bootstrap-md';
import { AddHeaderInterceptor, AddHeaderInterceptorProvider } from './shared/interceptors/add-header.interceptor';
import { ErrorInterceptorProvider } from './shared/interceptors/error.interceptor';
import {ModalEditComponent} from './shared/modules/modal-edit/modal-edit.component';
import {ModalAddComponent} from './shared/modules/modal-add/modal-add.component';
import { ModalAddOutgoingSoldierComponent } from './shared/modules/modal-add-outgoing-soldier/modal-add-outgoing-soldier.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalEditComponent,
    ModalAddComponent,
    ModalAddOutgoingSoldierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AlertModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    ModalModule
  ],
  providers: [AddHeaderInterceptorProvider,
    ErrorInterceptorProvider
  ],
  entryComponents: [ModalEditComponent, ModalAddComponent],
  entryComponents: [ModalAddOutgoingSoldierComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
