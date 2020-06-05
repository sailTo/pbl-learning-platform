import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Response } from '../models/generic-response';
import { Course } from '../models/course';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  user: User;

  requestURL = {
    'my': '/api/searchMyCourses', 
    'other': '/api/searchOtherCourses', 
    'all': '/api/searchAllCourses', 
    'all_my': '/api/searchAllMyCourses', 
  };

  constructor(
    private http: HttpClient
  ) { 
    // this.user = JSON.parse(localStorage.getItem("User"));
    this.user = {
      u_id: "S001", 
      type: "student", 
      u_name: "001", 
      gender: "male",
      description: "user desc",
      image: "", 
      token: "",
      password: "", 
    }
  }

  getCourses(type: string, pageIndex: number, pageSize: number) {
    const params = new HttpParams({ fromObject: {
      pbl_token: String(this.user.token),
      pageIndex: String(pageIndex), 
      pageSize: String(pageSize)
    }});
    return this.http.get<Response<{
      courses: { 
        list: Course[], 
      }, 
      teachers: {
        list: User[], 
      }
      total: number
    }>>(this.requestURL[type], { params });
  }

  getMyCourseNames() {
    const params = new HttpParams({ fromObject: {
      pbl_token: String(this.user.token),
    }});
    return this.http.get<Response<{courses: Course[], type: string}>>(this.requestURL['all_my'], { params });
  }

  joinCourse(courseId: number) {
    const headers = new HttpHeaders({
      'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"
    });
    const params = new HttpParams({ fromObject: {
      pbl_token: String(this.user.token),
      s_id: String(this.user.u_id), 
      c_id: String(courseId), 
    }});
    return this.http.post<Response<{}>>('/api/joinCourse', params.toString(), { headers });
  }
}