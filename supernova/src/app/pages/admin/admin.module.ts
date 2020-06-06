import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {FormsModule} from '@angular/forms';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzSelectModule } from "ng-zorro-antd/select";
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzTableModule } from 'ng-zorro-antd/table'
@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzFormModule,
    NzSelectModule,
    NzButtonModule,
    NzDropDownModule,
    FormsModule,
    NzTableModule
  ]
})
export class AdminModule { }
