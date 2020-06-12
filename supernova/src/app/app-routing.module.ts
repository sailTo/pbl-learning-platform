import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { PassportGuard } from './auth/passport.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./pages/default/default.module').then((m) => m.DefaultModule),
  },
  {
    path: 'passport',
    canActivate: [PassportGuard],
    canActivateChild: [PassportGuard],
    loadChildren: () =>
      import('./pages/passport/passport.module').then((m) => m.PassportModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
