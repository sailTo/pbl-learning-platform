import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/default/default.module').then(m => m.DefaultModule),
  },
  { path: 'passport', loadChildren: () => import('./pages/passport/passport.module').then(m => m.PassportModule) },
  { path: 'admin_course', loadChildren: () => import('./pages/admin-course/admin-course.module').then(m => m.AdminCourseModule) },
  { path: 'admin_project', loadChildren: () => import('./pages/admin-project/admin-project.module').then(m => m.AdminProjectModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
