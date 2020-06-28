import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DutyLayoutComponent} from "./duty-layout.component";


const routes: Routes = [{
  path: '',
  component: DutyLayoutComponent,
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'book', loadChildren: () => import('./book/book.module').then(m => m.BookModule) },
    { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
    { path: 'settlement', loadChildren: () => import('./settlement/settlement.module').then(m => m.SettlementModule) },
    { path: 'equipment', loadChildren: () => import('./equipment/equipment.module').then(m => m.EquipmentModule) }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DutyLayoutRoutingModule { }
