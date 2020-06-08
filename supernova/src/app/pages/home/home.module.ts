import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import{DescriptionBorderComponent} from './description-border/description-border.component'
import { NgZorroAntdModule} from 'ng-zorro-antd';

import {FormsModule} from '@angular/forms';
import { MyCourseCardComponent } from './course-card/course-card.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
// import { PaginationComponent} from '../../components/pagination/pagination.component';
// import { CourseCardComponent} from '../../components/course-card/course-card.component';
import {CoursesModule} from '../courses/courses.module';

@NgModule({
  declarations: [HomeComponent,DescriptionBorderComponent, ChangepasswordComponent,MyCourseCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    CoursesModule
    
  ],

})
export class HomeModule { }
