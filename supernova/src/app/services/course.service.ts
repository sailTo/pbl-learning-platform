import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Response } from '../models/generic-response';
import { Course } from '../models/course';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  requestURL = {
    'my': '/api/searchMyCourses', 
    'other': '/api/searchOtherCourses', 
    'all': '/api/searchAllCourses', 
    'all_my': '/api/searchAllMyCourses', 
  };

  constructor(
    private http: HttpClient
  ) { }

  getCourses(type: string, pageIndex: number, pageSize: number) {
    const params = new HttpParams({ fromObject: {
      // pbl_token: String(JSON.parse(localStorage.getItem("User")).token),
      pbl_token: String(), 
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
    }>>(this.requestURL[type], {params});
  }

  getMyCourseNames() {
    return this.http.get<{c_id: number, c_name: string}[]>(this.requestURL['all_my'], );
  }
}