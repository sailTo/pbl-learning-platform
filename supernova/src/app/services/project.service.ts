import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Project } from '../models/project';
import {Response} from "../models/generic-response";
import {Discussion} from "../models/discussion";
import {environment} from "../../environments/environment";
import {Reply} from "../models/reply";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  findProjectsByCourseId(courseId: number,
    // pageIndex: number, pageSize: number
  ) {
    const params = new HttpParams({
      fromObject: {
        // pbl_token: String(JSON.parse(localStorage.getItem("User")).token),
        pbl_token: this.userService.getUser().token,
        c_id: String(courseId),
        // pageIndex: String(pageIndex), 
        // pageSize: String(pageSize)
      }
    });
    return this.http.get<Response<{ projects: Project[], project_take: number, type: string }>>('/api/searchProject', { params });
  }

  getProject(projectId: number){
    const params = new HttpParams({ fromObject: {
        pbl_token: String(this.userService.getUser().token),
        p_id: String(projectId),
      }});
    return this.http.get<Response<{project: Project}>>(`${environment.apiUrl}/api/getProjectByPid`, { params });
  }
}
