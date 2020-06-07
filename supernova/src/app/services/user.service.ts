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
      return JSON.parse(localStorage.getItem("User"));
    } else {
      // return {
      //   u_id: "A001",
      //   type: "admin",
      //   u_name: "黄元敏",
      //   gender: "男",
      //   description: "user desc",
      //   image: 'http://123.56.219.88/SuperNova/UploadImage/default.jpg',
      //   token: "",
      //   password: "",
      //   status: true,
      // };
      return {
        u_id: "T001",
        type: "teacher",
        u_name: "黄元敏",
        gender: "男",
        description: "user desc",
        image: 'http://123.56.219.88/SuperNova/UploadImage/default.jpg',
        token: "",
        password: "",
        status: true,
      };
      // return {
      //   u_id: "S001",
      //   type: "student",
      //   u_name: "黄元敏",
      //   gender: "男",
      //   description: "user desc",
      //   image: 'http://123.56.219.88/SuperNova/UploadImage/default.jpg',
      //   token: "",
      //   password: "",
      //   status: true,
      // };
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
