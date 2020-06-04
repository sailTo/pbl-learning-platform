import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzGridModule } from "ng-zorro-antd/grid";
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { ProjectDetailsComponent } from './project-details.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { MembersComponent } from './components/members/members.component';
import { DiscussionsComponent } from './components/discussions/discussions.component';
import { FilesComponent } from './components/files/files.component';

import { AngularGanttScheduleTimelineCalendarModule } from "angular-gantt-schedule-timeline-calendar";

@NgModule({
  declarations: [
    ProjectDetailsComponent, 
    TasksComponent, 
    MembersComponent, 
    DiscussionsComponent, 
    FilesComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ProjectDetailsRoutingModule, 
    NzAvatarModule, 
    NzCardModule, 
    NzEmptyModule, 
    NzGridModule, 
    NzIconModule, 
    NzTabsModule, 
    NzTableModule, 
    NzDividerModule, 
    NzButtonModule, 
    NzSliderModule, 
    NzMessageModule, 
    NzModalModule, 
    AngularGanttScheduleTimelineCalendarModule, 
  ]
})
export class ProjectDetailsModule { }
