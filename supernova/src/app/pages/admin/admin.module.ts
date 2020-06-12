import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {ReactiveFormsModule  ,FormsModule} from '@angular/forms';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzSelectModule } from "ng-zorro-antd/select";
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzTableModule } from 'ng-zorro-antd/table';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import { AddUserComponent } from './add-user/add-user.component';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzPopconfirmModule} from 'ng-zorro-antd';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
@NgModule({
  declarations: [AdminComponent, AddUserComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzFormModule,
    NzSelectModule,
    NzButtonModule,
    NzDropDownModule,
    FormsModule,
    NzTableModule,
    NzRadioModule,
    NzInputModule,
    NzIconModule,
    NzModalModule,
    NzSpinModule,
    ReactiveFormsModule,
    NzMessageModule,
    NzPopconfirmModule,
    NzDividerModule,
    NzCardModule,
    NzTabsModule
  ]
})
export class AdminModule { }
