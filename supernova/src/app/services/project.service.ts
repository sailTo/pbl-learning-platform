import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

  findProjectsByCourseId(courseId: number, 
    // pageIndex: number, pageSize: number
  ) {
    const params = new HttpParams({ fromObject: {
      courseId: String(courseId), 
      // pageIndex: String(pageIndex), 
      // pageSize: String(pageSize)
    }});
    return this.http.get<{project_take: number, projects: Project[]}>('/api/searchProject', { params });
  }

  // getProjectById(projectId: number) {
  //   const params = new HttpParams({ fromObject: {
  //     projectId: String(projectId), 
  //   }});
  //   return this.http.get<{project: Project}>('/api/')
  // }
}
