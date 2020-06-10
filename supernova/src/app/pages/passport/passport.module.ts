import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import {
  NzPopoverModule,
  NzProgressModule,
  NzLayoutModule,
  NzIconModule,
} from 'ng-zorro-antd';

import { PassportRoutingModule } from './passport-routing.module';
import { PassportComponent } from './passport.component';
import { UserLoginComponent } from './login/login.component';
import { UserRegisterComponent } from './register/register.component';

@NgModule({
  declarations: [PassportComponent, UserLoginComponent, UserRegisterComponent],
  imports: [
    CommonModule,
    PassportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzTabsModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzAlertModule,
    NzModalModule,
    NzTypographyModule,
    NzMessageModule,
    NzSelectModule,
    NzPopoverModule,
    NzProgressModule,
    NzLayoutModule,
    NzRadioModule,
    NzCheckboxModule,
    NzIconModule,
  ],
})
export class PassportModule {}
