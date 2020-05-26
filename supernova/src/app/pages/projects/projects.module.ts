import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzEmptyModule } from 'ng-zorro-antd/empty';


import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectCardComponent, 
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule, 
    FormsModule, 
    NzSelectModule, 
    NzGridModule, 
    NzAvatarModule, 
    NzCardModule, 
    NzIconModule, 
    NzTabsModule, 
    NzEmptyModule, 
  ], 
})
export class ProjectsModule { }
