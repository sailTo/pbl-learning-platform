import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './default.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'courses' },
      { path: 'welcome', loadChildren: () => import('../welcome/welcome.module').then(m => m.WelcomeModule) },
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomeModule) },
      { path: 'courses', loadChildren: () => import('../courses/courses.module').then(m => m.CoursesModule) },
      { path: 'score', loadChildren: () => import('../score/score.module').then(m => m.ScoreModule) },
      { path: 'signup', loadChildren: () => import('../signup/signup.module').then(m => m.SignupModule) },
      { path: 'projects', loadChildren: () => import('../projects/projects.module').then(m => m.ProjectsModule) },
      { path: 'project', loadChildren: () => import('../project-details/project-details.module').then(m => m.ProjectDetailsModule) },
      { path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule) },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
