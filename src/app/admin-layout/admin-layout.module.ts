import { AlertModule } from './../shared/modules/alert/alert.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  declarations: [AdminLayoutComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    NgbDropdownModule,
    AlertModule,
  ]
})
export class AdminLayoutModule { }
