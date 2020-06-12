import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProjectRoutingModule } from './admin-project-routing.module';
import { AdminProjectComponent } from './admin-project.component';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzFormModule} from 'ng-zorro-antd/form';
import {ReactiveFormsModule ,FormsModule} from '@angular/forms';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';

@NgModule({
  declarations: [AdminProjectComponent],
  imports: [
    CommonModule,
    AdminProjectRoutingModule,
    NzCardModule,
    NzTabsModule,
    NzTableModule,
    NzMessageModule,
    NzIconModule,
    NzModalModule,
    NzSpinModule,
    NzRadioModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzDividerModule,
    NzButtonModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzInputModule,
    NzInputNumberModule

  ]
})
export class AdminProjectModule { }
