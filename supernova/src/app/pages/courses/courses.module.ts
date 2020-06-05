import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from "ng-zorro-antd/message";

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component'; 


@NgModule({
  declarations: [
    CoursesComponent, 
    CourseCardComponent, 
    PaginationComponent, 
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule, 
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
  ], 
})
export class CoursesModule { }
