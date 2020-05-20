import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient
  ) { }

  getMyCourses() {
    return this.http.get<{
      c_id: number,
      t_id: number, 
      c_name: string, 
      t_name: string, 
      point: number, 
      description: string, 
      status: boolean, // 未发布false, 已发布true
      c_image_URL: string, // course封面图，没有的话应该返回默认图URL
      t_image_URL: string, // 教师头像，没有的话应该返回默认图URL
    }[]>('/api/searchMyCourses');
  }
}
