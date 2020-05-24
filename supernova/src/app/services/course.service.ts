import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  requestURL = {
    'my': '/api/searchMyCourses', 
    'other': '/api/searchOtherCourses', 
    'all': '/api/searchAllCourses', 
  };

  constructor(
    private http: HttpClient
  ) { }

  getCourses(type: string, pageIndex: number, pageSize: number) {
    const params = new HttpParams({ fromObject: {
      pageIndex: String(pageIndex), 
      pageSize: String(pageSize)
    }});
    return this.http.get<{courses: Course[], total: number}>(this.requestURL[type], {params});
  }
}

export interface Course {
  c_id: number,
  t_id: number, 
  c_name: string, 
  t_name: string, 
  point: number, 
  description: string, 
  status: boolean, // 未发布false, 已发布true
  c_image_URL: string, // course封面图，没有的话应该返回默认图URL
  t_image_URL: string, // 教师头像，没有的话应该返回默认图URL
}