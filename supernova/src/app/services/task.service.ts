import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Response } from '../models/generic-response';
import { Task } from '../models/task';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getTasks(projectId: number) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: this.userService.getUser().token,
        p_id: String(projectId),
      },
    });
    return this.http.get<
      Response<{
        assignments: Task[];
        doneNum: number[]; // 每个assignment已经完成的人数
        totalNum: number; // 项目总人数
        studentStatus: boolean[]; // 当前学生每个assignment的完成情况，教师返回空数组
        urgeStatus: boolean[]; // 每个assignment是否被催促，教师返回空数组
      }>
    >(`${environment.apiUrl}/api/searchAssignment`, { params });
  }

  modifyTasks(tasks: Task[]) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: this.userService.getUser().token,
        assignments: JSON.stringify(tasks),
      },
    });
    return this.http.put<Response<{}>>('/api/changeAssignments', params);
  }

  addTasks(tasks: Task[]) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    });
    const params = new HttpParams({
      fromObject: {
        pbl_token: this.userService.getUser().token,
        assignments: JSON.stringify(tasks),
      },
    });
    return this.http.post<Response<{ a_idList: number[] }>>(
      `${environment.apiUrl}/api/createAssignments`,
      params.toString(),
      { headers }
    );
  }

  addTask(task: Task) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    });
    const params = new HttpParams({
      fromObject: {
        pbl_token: this.userService.getUser().token,
        assignment: JSON.stringify(task),
      },
    });
    return this.http.post<Response<{ a_id: number }>>(
      `${environment.apiUrl}/api/createAssignment`,
      params.toString(),
      { headers }
    );
  }

  deleteTasks(assignmentIdList: number[], projectId: number) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: this.userService.getUser().token,
        a_idList: JSON.stringify(assignmentIdList),
        p_id: String(projectId),
      },
    });
    return this.http.delete<Response<{}>>(
      `${environment.apiUrl}/api/deleteAssignments`,
      { params }
    );
  }

  modifyAndDeleteAssignments(assignmentList: Task[], opList: string[]) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: this.userService.getUser().token,
        assignmentList: JSON.stringify(assignmentList),
        opList: JSON.stringify(opList),
      },
    });
    return this.http.put<Response<{}>>(
      `${environment.apiUrl}/api/modifyAssignments`,
      params
    );
  }

  urgeTask(assignmentId: number, projectId: number) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: this.userService.getUser().token,
        a_id: String(assignmentId),
        p_id: String(projectId),
      },
    });
    return this.http.put<Response<{}>>(
      `${environment.apiUrl}/api/urgeAssignment`,
      params
    );
  }
}
