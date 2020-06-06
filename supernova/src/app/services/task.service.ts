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
    return this.http.get<Response<{assignments: Task[], studentStatus: boolean[]}>>('/api/searchAssignment', { params });
  }
}
