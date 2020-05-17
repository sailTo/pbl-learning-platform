import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from '../../components/course-card/course-card.component'; 


@NgModule({
  declarations: [CoursesComponent, CourseCardComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule, 
    NzAvatarModule, 
    NzCardModule, 
    NzIconModule, 
  ], 
})
export class CoursesModule { }
