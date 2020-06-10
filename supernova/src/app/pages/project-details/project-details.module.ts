import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { AngularGanttScheduleTimelineCalendarModule } from 'angular-gantt-schedule-timeline-calendar';

import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { ProjectDetailsComponent } from './project-details.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { MembersComponent } from './components/members/members.component';
import { DiscussionsComponent } from './components/discussions/discussions.component';
import { FilesComponent } from './components/files/files.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ChooseTaskComponent } from './components/choose-task/choose-task.component';

@NgModule({
  declarations: [
    ProjectDetailsComponent,
    TasksComponent,
    MembersComponent,
    DiscussionsComponent,
    FilesComponent,
    AddTaskComponent,
    ChooseTaskComponent,
  ],
  imports: [
    NzToolTipModule,
    CommonModule,
    ProjectDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    NzInputModule,
    NzFormModule,
    NzListModule,
    NzCommentModule,
    NzSwitchModule,
    NzInputNumberModule,
    NzUploadModule,
    NzPopconfirmModule,
    NzAffixModule,
    NzUploadModule,
    NzSpinModule,
    NzDatePickerModule,
    NzBadgeModule,
    AngularGanttScheduleTimelineCalendarModule,
  ],
})
export class ProjectDetailsModule {}
