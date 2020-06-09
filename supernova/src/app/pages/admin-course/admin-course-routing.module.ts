import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminCourseComponent } from './admin-course.component';

const routes: Routes = [{ path: '', component: AdminCourseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCourseRoutingModule { }
