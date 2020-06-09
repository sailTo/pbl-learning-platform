import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './default.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('../courses/courses.module').then((m) => m.CoursesModule),
      },
      {
        path: 'score',
        loadChildren: () =>
          import('../score/score.module').then((m) => m.ScoreModule),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('../projects/projects.module').then((m) => m.ProjectsModule),
      },
      {
        path: 'project',
        loadChildren: () =>
          import('../project-details/project-details.module').then(
            (m) => m.ProjectDetailsModule
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../admin/admin.module').then((m) => m.AdminModule),
      },

      {
        path: 'admin_course',
        loadChildren: () =>
          import('../admin-course/admin-course.module').then(
            (m) => m.AdminCourseModule
          ),
      },
      {
        path: 'admin_project',
        loadChildren: () =>
          import('../admin-project/admin-project.module').then(
            (m) => m.AdminProjectModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultRoutingModule { }
