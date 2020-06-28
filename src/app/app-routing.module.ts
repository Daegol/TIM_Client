import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-layout/admin-layout.module').then(
        m => m.AdminLayoutModule
      ),
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'parent',
  //   loadChildren: () =>
  //     import('./parent-layout/parent-layout.module').then(
  //       m => m.ParentLayoutModule
  //     ),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'student',
  //   loadChildren: () =>
  //     import('./student-layout/student-layout.module').then(
  //       m => m.StudentLayoutModule
  //     ),
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./server-error/server-error.module').then(
        m => m.ServerErrorModule
      )
  },
  {
    path: 'access-denied',
    loadChildren: () =>
      import('./access-denied/access-denied.module').then(
        m => m.AccessDeniedModule
      )
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./not-found/not-found.module').then(m => m.NotFoundModule)
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
