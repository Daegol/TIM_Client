import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminLayoutComponent} from './admin-layout.component';


const routes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'soldier-page', loadChildren: () => import('./soldier-page/soldier-page.module').then(m => m.SoldiersPageModule) },
    { path: 'commander-page', loadChildren: () => import('./commander-page/commander-page.module').then(m => m.CommandersPageModule) },
    { path: 'company-page', loadChildren: () => import('./company-page/company-page.module').then(m => m.CompanyPageModule) },
    { path: 'admins-page', loadChildren: () => import('./admins-page/admins-page.module').then(m => m.AdminsPageModule) },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
