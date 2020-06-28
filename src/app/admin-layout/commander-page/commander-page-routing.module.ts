import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommanderListComponent} from './components/commander-list/commander-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'postfix'},
  {path: 'list', component: CommanderListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommanderPageRoutingModule {}
