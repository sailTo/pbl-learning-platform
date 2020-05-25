import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectCascadeSelectComponent } from '../../components/project-cascade-select/project-cascade-select.component';


@NgModule({
  declarations: [ProjectsComponent, ProjectCascadeSelectComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule, 
    // NzCascaderModule, 
    NzSelectModule, 
  ], 
  // schemas: [NO_ERRORS_SCHEMA]
})
export class ProjectsModule { }
