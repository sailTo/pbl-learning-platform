import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import{DescriptionBorderComponent} from './description-border/description-border.component'
import { NgZorroAntdModule} from 'ng-zorro-antd';
import {AvatarComponent} from './avatar/avatar.component';
import {FormsModule} from '@angular/forms';
import { CourseCardComponent } from './course-card/course-card.component'

@NgModule({
  declarations: [HomeComponent,DescriptionBorderComponent,AvatarComponent, CourseCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgZorroAntdModule,
    FormsModule
  ],
  providers:[
    AvatarComponent
  ]
})
export class HomeModule { }
