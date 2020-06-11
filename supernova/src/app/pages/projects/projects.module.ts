import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { NzTableModule } from 'ng-zorro-antd/table';

import {
  NzBadgeModule,
  NzButtonModule,
  NzFormModule,
  NzInputModule,
  NzInputNumberModule,
  NzModalModule,
  NzPaginationModule,
  NzStatisticModule,
  NzTagModule,
  NzUploadModule,
} from 'ng-zorro-antd';

import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ShowProjectComponent } from './components/show-project/show-project.component';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectCardComponent,
    CreateProjectComponent,
    ShowProjectComponent,
  ],
  imports: [
    NzTableModule,
    NzDescriptionsModule,
    NzToolTipModule,
    NzSwitchModule,
    NzAvatarModule,
    CommonModule,
    ProjectsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzEmptyModule,
    NzAvatarModule,
    NzCardModule,
    NzIconModule,
    NzGridModule,
    NzTabsModule,
    NzPaginationModule,
    NzBadgeModule,
    NzButtonModule,
    NzTagModule,
    NzStatisticModule,
    NzModalModule,
    NzMessageModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzUploadModule,
  ],
})
export class ProjectsModule {}
