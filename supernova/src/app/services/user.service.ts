import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getGroupersByProjectId(projectId: number) {
    const params = new HttpParams({ fromObject: {
      p_id: String(projectId), 
    }});
    return this.http.get<{groupers: User[]}>('/api/searchGroupers', { params });
  }
}