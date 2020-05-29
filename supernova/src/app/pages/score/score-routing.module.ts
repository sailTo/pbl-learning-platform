import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScoreComponent } from './score.component';

const routes: Routes = [{ path: '', component: ScoreComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoreRoutingModule { }
