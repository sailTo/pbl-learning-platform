import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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
}
export interface Project {
  p_id: number, 
  c_id: number, 
  p_name: string, 
  description: string, 
  grading_status: boolean, // true 表示已评分，false 未评分
  teacher_grade_ratio: number, 
  self_grade_ratio: number, 
  mutual_grade_ratio: number, 
}