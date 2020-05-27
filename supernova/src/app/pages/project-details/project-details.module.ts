import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzGridModule } from "ng-zorro-antd/grid";
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzEmptyModule } from 'ng-zorro-antd/empty';

import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { ProjectDetailsComponent } from './project-details.component';


@NgModule({
  declarations: [ProjectDetailsComponent],
  imports: [
    CommonModule,
    ProjectDetailsRoutingModule, 
    NzAvatarModule, 
    NzCardModule, 
    NzEmptyModule, 
    NzGridModule, 
    NzIconModule, 
    NzTabsModule, 
  ]
})
export class ProjectDetailsModule { }
