import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassportComponent } from './passport.component';
import { UserLoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: PassportComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: UserLoginComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassportRoutingModule { }
