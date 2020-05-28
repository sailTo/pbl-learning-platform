import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Course } from '../models/course';

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
      pageIndex: String(pageIndex), 
      pageSize: String(pageSize)
    }});
    return this.http.get<{courses: Course[], total: number}>(this.requestURL[type], {params});
  }

  getMyCourseNames() {
    return this.http.get<{c_id: number, c_name: string}[]>(this.requestURL['all_my'], );
  }
}