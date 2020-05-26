import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

// import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
// import { ProjectCascadeSelectComponent } from '../../components/project-cascade-select/project-cascade-select.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectCardComponent, 
    // ProjectCascadeSelectComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule, 
    FormsModule, 
    // NzCascaderModule, 
    NzSelectModule, 
    NzGridModule, 
    NzAvatarModule, 
    NzCardModule, 
    NzIconModule, 
  ], 
})
export class ProjectsModule { }
