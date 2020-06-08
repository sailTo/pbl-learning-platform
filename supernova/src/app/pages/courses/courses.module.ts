import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

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
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from "ng-zorro-antd/input";
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { CreateCourseComponent } from './components/create-course/create-course.component'; 


@NgModule({
  declarations: [
    CoursesComponent, 
    CourseCardComponent, 
    PaginationComponent, 
    CreateCourseComponent, 
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule, 
    FormsModule, 
    ReactiveFormsModule, 
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
  exports:[
    CourseCardComponent,
    PaginationComponent
  ]
})
export class CoursesModule { }
