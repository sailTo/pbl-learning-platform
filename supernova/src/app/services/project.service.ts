import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Project } from '../models/project';

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
    const params = new HttpParams({
      fromObject: {
        // pbl_token: String(JSON.parse(localStorage.getItem("User")).token),
        pbl_token: String(),
        c_id: String(courseId),
        // pageIndex: String(pageIndex), 
        // pageSize: String(pageSize)
      }
    });
    return this.http.get<{ project_take: number, projects: Project[] }>('/api/searchProject', { params });
  }

  // getProjectById(projectId: number) {
  //   const params = new HttpParams({ fromObject: {
  //     projectId: String(projectId), 
  //   }});
  //   return this.http.get<{project: Project}>('/api/')
  // }
}
