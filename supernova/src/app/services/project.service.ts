import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { UserService } from './user.service';

import { GradeItem } from '../models/GradeItem';
import { Project } from '../models/project';
import { Response } from '../models/generic-response';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient, private userService: UserService) {}

  findGradeItemsByPid(p_id: number) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: this.userService.getUser().token,
        p_id: String(p_id),
      },
    });
    return this.http.get<Response<{ grades: GradeItem[] }>>(
      `${environment.apiUrl}:8022/projectController/getGradeItems`,
      { params }
    );
  }

  findProjectsByCourseId(courseId: number) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: this.userService.getUser().token,
        c_id: String(courseId),
      },
    });
    return this.http.get<
      Response<{ projects: Project[]; project_take: number; type: string }>
    >(`${environment.apiUrl}:8022/projectController/searchProject`, { params });
  }

  getProject(projectId: number) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        p_id: String(projectId),
      },
    });
    return this.http.get<Response<{ project: Project }>>(
      `${environment.apiUrl}:8022/projectController/getProjectByPid`,
      { params }
    );
  }

  deleteProject(projectId: number) {
    const params = {
      pbl_token: String(this.userService.getUser().token),
      p_id: String(projectId),
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params,
    };
    return this.http.delete<Response<any>>(
      `${environment.apiUrl}:8022/projectController/deleteProject`,
      options
    );
  }

  addProject(project: Project, items: GradeItem[]) {
    const params = {
      pbl_token: String(this.userService.getUser().token),
      project: JSON.stringify(project),
      grades: JSON.stringify(items),
    };
    return this.http.post<Response<{ p_id: number }>>(
      `${environment.apiUrl}:8022/projectController/createProject`,
      this.transformRequest(params),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
  }

  joinProject(p_id: number) {
    const params = {
      pbl_token: String(this.userService.getUser().token),
      p_id: p_id,
    };
    return this.http.post<Response<any>>(
      `${environment.apiUrl}:8022/projectController/joinProject`,
      this.transformRequest(params),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
  }

  changeProject(project: Project, items: GradeItem[]) {
    const params = {
      pbl_token: String(this.userService.getUser().token),
      project: JSON.stringify(project),
      grades: JSON.stringify(items),
    };
    return this.http.post<Response<any>>(
      `${environment.apiUrl}:8022/projectController/changeProject`,
      this.transformRequest(params),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
  }

  transformRequest(data) {
    var str = '';
    for (var i in data) {
      str += i + '=' + data[i] + '&';
    }
    str.substring(0, str.length - 1);
    return str;
  }
}
