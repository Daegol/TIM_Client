import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SoldiersListComponent} from './components/soldiers-list/soldiers-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'postfix'},
  {path: 'list', component: SoldiersListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoldiersPageRoutingModule {}
