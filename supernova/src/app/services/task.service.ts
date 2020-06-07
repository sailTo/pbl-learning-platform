import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Response } from "../models/generic-response";
import { Task } from '../models/task';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  getTasks(projectId: number) {
    const params = new HttpParams({ fromObject: {
      pbl_token: this.userService.getUser().token,
      p_id: String(projectId),
    }});
    return this.http.get<Response<{
      assignments: Task[],
      doneNum: number[], // 每个assignment已经完成的人数
      totalNum: number, // 项目总人数
      studentStatus: boolean[], // 当前学生每个assignment的完成情况，教师返回空数组
      urgeStatus: boolean[], // 每个assignment是否被催促，教师返回空数组
    }>>('/api/searchAssignment', { params });
  }
}
