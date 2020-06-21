import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreRoutingModule } from './score-routing.module';
import { ScoreComponent } from './score.component';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ScoreTableComponent } from './score-table/score-table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
@NgModule({
  declarations: [ScoreComponent, ScoreTableComponent],
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
    NzSpinModule,
    NzCardModule,
    NzTabsModule,
    NzEmptyModule,
  ],
})
export class ScoreModule {}
