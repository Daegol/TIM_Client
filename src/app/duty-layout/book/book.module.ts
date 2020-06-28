import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import {IconsModule, TableModule} from "angular-bootstrap-md";
import {FormsModule} from "@angular/forms";
import {PageHeaderModule} from "../../shared/modules";


@NgModule({
  declarations: [BookComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    TableModule,
    FormsModule,
    PageHeaderModule,
    IconsModule
  ]
})
export class BookModule { }
