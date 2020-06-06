import { Injectable } from '@angular/core';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'
import {Project} from '../models/project'
import {Response} from "../models/generic-response";
import {Rating} from "../models/rating";
import {UserService} from "./user.service";
export interface ret_courseData{
  c_id :number,
  c_name:string
}

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  constructor(
    private http: HttpClient,
    private userService:UserService
  ) { }
  getProjectScoreById(project_id :string): any{
    //to do
    // const params = new HttpParams({fromObject:{
    //   pbl_token: String(JSON.parse(localStorage.getItem("User")).token),
    //   p_id : project_id,
    // }});
    //  this.http.get<any>(`${environment.apiUrl}/api/countAssignmentDone`,{params}).subscribe(
    //    (data) =>{
    //      this.ret_data =  data;
    //    }
    //  );

  }
  getAllMyCourses():ret_courseData[]{
      const params = new HttpParams({fromObject:{
        pbl_token: String(JSON.parse(localStorage.getItem("User")).token),
      }});
        var ret_data;
       this.http.get<any>(`${environment.apiUrl}/api/searchAllMyCourses`,{params}).subscribe(
         (data) =>{
           ret_data = data.courses;
         }
       );
       return ret_data;
  }

  getProjectsByCourseId(id:number):Project[]{
    const params = new HttpParams({fromObject:{
      pbl_token: String(JSON.parse(localStorage.getItem("User")).token),
      c_id : String(id),
    }});
    var ret_projects;
    this.http.get<any>(`${environment.apiUrl}/api/searchProject`,{params}).subscribe(
      (data) =>{
        ret_projects = data.projects;
      
      }
    );
   return ret_projects;
  }

  getRating(projectId: number){
    const params = new HttpParams({ fromObject: {
        pbl_token: String(this.userService.getUser().token),
        p_id: String(projectId)
      }});
    return this.http.get<Response<{rateMapping: Rating[]}>>('/api/getMyEvaluation', { params });
  }

  toRating(projectId: number, u_Id: string, grade:number){
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"
      })
    };
    const params = {
      pbl_token: String(this.userService.getUser().token),
      p_id: String(projectId),
      u_id: u_Id,
      grade: grade
    };
    return this.http.post<any>(`${environment.apiUrl}/api/evaluateOther`,
      this.transformRequest(params),
      {headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      });
  }
  transformRequest(data) {
    var str = '';
    for (var i in data) {
      str += i + '=' + data[i] + '&';
    }
    str.substring(0, str.length - 1);
    return str;
  };
}
