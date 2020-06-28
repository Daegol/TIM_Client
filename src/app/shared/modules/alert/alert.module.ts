import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [AlertComponent]
})
export class AlertModule { }
