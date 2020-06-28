import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminsListComponent } from './components/admins-list/admins-list.component';


const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'postfix'},
  {path: 'list', component: AdminsListComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsPageRoutingModule { }
