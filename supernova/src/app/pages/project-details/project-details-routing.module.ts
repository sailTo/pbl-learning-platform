import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectDetailsComponent } from './project-details.component';
import { TasksComponent } from "./components/tasks/tasks.component";
import { MembersComponent } from './components/members/members.component';
import { DiscussionsComponent } from './components/discussions/discussions.component';
import { FilesComponent } from './components/files/files.component';

const routes: Routes = [
  { 
    path: ':p_id', 
    component: ProjectDetailsComponent, 
    children: [
      { path: 'tasks', component: TasksComponent }, 
      { path: 'members', component: MembersComponent }, 
      { path: 'discussions', component: DiscussionsComponent }, 
      { path: 'files', component: FilesComponent }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDetailsRoutingModule { }
