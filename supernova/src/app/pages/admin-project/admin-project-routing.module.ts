import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminProjectComponent } from './admin-project.component';

const routes: Routes = [{ path: '', component: AdminProjectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProjectRoutingModule { }
