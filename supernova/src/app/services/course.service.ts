import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';

import { Response } from '../models/generic-response';
import { Course } from '../models/course';
import { User } from '../models/user';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import {stringify} from "querystring";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  requestURL = {
    my: `${environment.apiUrl}/api/searchMyCourses`,
    other: `${environment.apiUrl}/api/searchOtherCourses`,
    all: `${environment.apiUrl}/api/searchAllCourses`,
    all_my: `${environment.apiUrl}/api/searchAllMyCourses`,
  };

  constructor(private http: HttpClient, private userService: UserService) {}

  getCourse(
    c_id: number,
  ) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        c_id: String(c_id),
      },
    });
    return this.http.get<
      Response<{ course: Course }>>(`${environment.apiUrl}/api/searchCourseByCid`, { params });
  }

  getCourses(
    type: string,
    userId: string,
    pageIndex: number,
    pageSize: number
  ) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        u_id: userId,
        pageIndex: String(pageIndex),
        pageSize: String(pageSize),
      },
    });
    return this.http.get<
      Response<{
        courses: {
          list: Course[];
        };
        teachers: {
          list: User[];
        };
        total: number;
      }>
    >(this.requestURL[type], { params });
  }

  getMyCourseNames() {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
      },
    });
    return this.http.get<Response<{ courses: Course[]; type: string }>>(
      this.requestURL.all_my,
      { params }
    );
  }

  joinCourse(courseId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    });
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        s_id: String(this.userService.getUser().u_id),
        c_id: String(courseId),
      },
    });
    return this.http.post<Response<{}>>(
      `${environment.apiUrl}/api/joinCourse`,
      params.toString(),
      {
        headers,
      }
    );
  }

  createCourse(course: Course,image: any) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        course: JSON.stringify(course),
      },
    });
    const formData = new FormData();
    formData.append('image', image);
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,GET,PUT',
      'Access-Control-Max-Age': '1728000',
      'Access-Control-Allow-Headers':
        'Content-Type,Access-Token,Authorization,ybg',
    });
    // return this.http.put<Response<{img:string}>>(`${environment.apiUrl}/api/changeMyImage`,params,headers);
    const req = new HttpRequest(
      'POST',
      `${environment.apiUrl}/api/addCourse`,
      formData,
      {
        headers: headers,
        params: params,
      }
    );
    return this.http.request(req).pipe(filter((e) => e instanceof HttpResponse));
  }

  changeCourse(course: Course) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        course: JSON.stringify(course),
      },
    });
    return this.http.put<Response<{}>>(
      `${environment.apiUrl}/api/changeCourse`,
      params
    );
  }

  changeCourseWithImg(course: Course, image: any) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        course: JSON.stringify(course),
      },
    });
    const formData = new FormData();
    formData.append('image', image);
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,GET,PUT',
      'Access-Control-Max-Age': '1728000',
      'Access-Control-Allow-Headers':
        'Content-Type,Access-Token,Authorization,ybg',
    });
    const req = new HttpRequest(
      'POST',
      `${environment.apiUrl}/api/changeCourseWithImg`,
      formData,
      {
        headers: headers,
        params: params,
      }
    );
    return this.http.request(req).pipe(filter((e) => e instanceof HttpResponse));
  }

  deleteCourse(course: Course) {
    course.status = 0;
    return this.changeCourse(course);
  }

  publishCourse(course: Course) {
    course.status = 2;
    return this.changeCourse(course);
  }

  resumeCourse(course: Course) {
    return this.publishCourse(course);
  }


}
