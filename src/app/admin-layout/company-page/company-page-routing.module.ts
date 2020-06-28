import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyPageComponent } from './company-page.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import {EditCompanyComponent} from './edit-company/edit-company.component';


const routes: Routes = [
  {
    path: '',
    component: CompanyPageComponent
  },
  {
    path: 'add',
    component: AddCompanyComponent
  },
  {
    path: 'edit',
    component: EditCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyPageRoutingModule { }
