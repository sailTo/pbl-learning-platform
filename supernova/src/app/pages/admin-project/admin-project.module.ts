import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProjectRoutingModule } from './admin-project-routing.module';
import { AdminProjectComponent } from './admin-project.component';


@NgModule({
  declarations: [AdminProjectComponent],
  imports: [
    CommonModule,
    AdminProjectRoutingModule
  ]
})
export class AdminProjectModule { }
