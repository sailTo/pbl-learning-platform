import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'
import {Project} from '../models/project'
export interface ret_courseData{
  c_id :number,
  c_name:string
}

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  constructor(
    private http: HttpClient
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
}
