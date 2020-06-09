import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconsProviderModule } from '../../icons-provider.module';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

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
  ]
})
export class DefaultModule { }
