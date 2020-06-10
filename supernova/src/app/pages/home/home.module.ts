import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgZorroAntdModule, NzEmptyModule } from 'ng-zorro-antd';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DescriptionBorderComponent } from './description-border/description-border.component';
import { MyCourseCardComponent } from './course-card/course-card.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

import { CoursesModule } from '../courses/courses.module';

@NgModule({
  declarations: [
    HomeComponent,
    DescriptionBorderComponent,
    ChangepasswordComponent,
    MyCourseCardComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    NzEmptyModule,
    CoursesModule,
  ],
})
export class HomeModule {}
