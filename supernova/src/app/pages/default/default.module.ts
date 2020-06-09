import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconsProviderModule } from '../../icons-provider.module';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';


@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzTypographyModule,
    NzAvatarModule,
    NzDropDownModule,
  ]
})
export class DefaultModule { }
