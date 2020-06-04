import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Response } from "../models/generic-response";
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  getTasks(projectId: number) {
    const params = new HttpParams({ fromObject: {
      p_id: String(projectId), 
    }});
    return this.http.get<Response<{assignments: Task[]}>>('/api/searchAllFiles', { params });
  }
}
