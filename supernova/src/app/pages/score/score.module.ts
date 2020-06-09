import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreRoutingModule } from './score-routing.module';
import { ScoreComponent } from './score.component';
import { SearchListComponent } from './search-list/search-list.component';
 import {FormsModule} from '@angular/forms';
import {NzSelectModule } from "ng-zorro-antd/select";
import { ScoreTableComponent } from './score-table/score-table.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzIconModule} from 'ng-zorro-antd/icon'
import { SortTableComponent } from './sort-table/sort-table.component';
import { UserDefinedTableComponent } from './user-defined-table/user-defined-table.component'
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzMessageModule} from  'ng-zorro-antd/message'
import { CascaderComponent } from './cascader/cascader.component';
import { NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzSpinModule} from  'ng-zorro-antd/spin'
@NgModule({
  declarations: [ScoreComponent, SearchListComponent, ScoreTableComponent,SortTableComponent, UserDefinedTableComponent, CascaderComponent],
  imports: [
    CommonModule,
    ScoreRoutingModule,
    NzSelectModule,
    FormsModule,
    NzTableModule,
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
    NzMessageModule,
    NzInputNumberModule,
    NzSpinModule
  ]
})
export class ScoreModule { }
