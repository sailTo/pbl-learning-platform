import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { Response } from '../models/generic-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUser(): User {
    if (localStorage.getItem("User")) {
      return JSON.parse(localStorage.getItem("User"))
    } else {
      // return undefined;
      return {
        u_id: "T001",
        type: "teacher",
        u_name: "001",
        gender: "male",
        description: "user desc",
        image: "",
        token: "",
        password: "",
      };
    }
  }

  getGroupersByProjectId(projectId: number) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.getUser().token),
        p_id: String(projectId),
      }
    });
    return this.http.get<Response<{ leader: string, groupers: User[] }>>('/api/searchGroupers', { params });
  }
}
