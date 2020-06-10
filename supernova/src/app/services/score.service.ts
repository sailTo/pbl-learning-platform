import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { Project } from '../models/project';
import { Response } from '../models/generic-response';
import { Rating } from '../models/rating';
import { UserService } from './user.service';
import { Course } from '../models/course';
import { GradeItem } from '../models/GradeItem';
import { ItemData } from '../models/ItemData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  constructor(private http: HttpClient, private userService: UserService) {}
  getProjectScoreById(project_id: string): any {
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
  getAllMyCourses() {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
      },
    });
    return this.http.get<Response<{ courses: Course[] }>>(
      `${environment.apiUrl}/api/searchAllMyCourses`,
      { params }
    );
  }

  getProjectsByCourseId(id: number) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        c_id: String(id),
      },
    });

    return this.http.get<Response<{ projects: Project[] }>>(
      `${environment.apiUrl}/api/searchProject`,
      { params }
    );
  }

  getColumnItems(p_id: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        p_id: p_id,
      },
    });
    return this.http.get<Response<{ grades: GradeItem[] }>>(
      `${environment.apiUrl}/api/getGradeItems`,
      { params }
    );
  }
  getAssignmentDone(p_id: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        p_id: p_id,
      },
    });
    return this.http.get<
      Response<{
        totalAssignmentNum: number;
        doneInformations: { s_id: string; s_name: string; doneNum: number }[];
      }>
    >(`${environment.apiUrl}/api/countAssignmentDone`, { params });
  }
  getCountDiscussion(p_id: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        p_id: p_id,
      },
    });
    return this.http.get<
      Response<{ maxDiscussNum: number; discussInformations: ItemData[] }>
    >(`${environment.apiUrl}/api/countDiscussion`, { params });
  }
  getSelfAndMutualScore(p_id: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        p_id: p_id,
      },
    });
    return this.http.get<
      Response<{
        selfAndMutualInformations: {
          s_id: string;
          s_name: string;
          selfScore: number;
          mutualScore: number;
        }[];
      }>
    >(`${environment.apiUrl}/api/SelfAndMutualevaluateScore`, { params });
  }
  getGradeItemScore(p_id: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        p_id: p_id,
      },
    });
    // return this.http.get<Response<{selfAndMutualInformations:{s_id:string,s_name:string,selfScore:number,mutualScore:number}[]}>>(`${environment.apiUrl}/api/SelfAndMutualevaluateScore`,{params});
    return this.http.get<
      Response<{
        allItems: {
          s_id: string;
          s_name: string;
          itemsList: { item_id: string; item_name: string; grade: number }[];
        }[];
      }>
    >(`${environment.apiUrl}/api/getItemsByPid`, { params });
  }

  postGradeItemScore(p_id: string, itemData: ItemData) {
    var insertData = [];
    itemData.dynamicScore.forEach((dynamicScore) => {
      var temp = {
        item_id: dynamicScore.item_id,
        p_id: p_id,
        u_id: itemData.s_id,
        grade: dynamicScore.grade,
      };
      insertData.push(temp);
    });

    const params = {
      pbl_token: String(this.userService.getUser().token),
      grades: JSON.stringify(insertData),
    };
    return this.http.post<Response<{}>>(
      `${environment.apiUrl}/api/evaluateByTeacher`,
      this.transformRequest(params),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
  }

  getStudentSelfScore(p_id:string){
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        p_id: p_id,
      },
    });
    return this.http.get<Response<{ grade: number}>>(
      `${environment.apiUrl}/api/searchEvaluateBySelf`,
      { params }
    );
  }

  getStudentMutualScore(p_id:string){
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        p_id: p_id,
      },
    });
    return this.http.get<Response<{ grade: number}>>(
      `${environment.apiUrl}/api/searchEvaluateByOther`,
      { params }
    );
  }

  getStudentTeacherScore(p_id:string){
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        p_id: p_id,
      },
    });
    return this.http.get<Response<{ grades:{item_id:string,grade:number}[] }>>(
      `${environment.apiUrl}/api/searchEvaluateByTeacher`,
      { params }
    );
  }

  getStudentDiscussionAndAssignmentNum(p_id:string){
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        p_id: p_id,
      },
    });
    return this.http.get<Response<{discussionCount:number,assignmentDoneCount:number}>>(
      `${environment.apiUrl}/api/getStudentDiscussonAndAssignmentCountByPid`,
      { params }
    );
  }

  // getStudentAssignmentNum(p_id:string){
  //   const params = new HttpParams({
  //     fromObject: {
  //       pbl_token: String(this.userService.getUser().token),
  //       p_id: p_id,
  //     },
  //   });
  //   return this.http.get<Response<{assignmentNum:number}>>(
  //     `'${environment.apiUrl}'`,
  //     { params }
  //   );
  // }

  updateTeacherGrade(teacherScores:any){
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        student_project_list:JSON.stringify(teacherScores)
      },
    });
    return this.http.put<Response<{}>>(`${environment.apiUrl}/api/updateTeacherGrade`, params);
  }








  getRating(projectId: number) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        p_id: String(projectId),
      },
    });
    return this.http.get<Response<{ rateMapping: Rating[] }>>(
      `${environment.apiUrl}/api/getMyEvaluation`,
      { params }
    );
  }

  toRating(projectId: number, u_Id: string, grade: number) {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      }),
    };
    const params = {
      pbl_token: String(this.userService.getUser().token),
      p_id: String(projectId),
      u_id: u_Id,
      grade: grade,
    };
    return this.http.post<any>(
      `${environment.apiUrl}/api/evaluateOther`,
      this.transformRequest(params),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
  }
  transformRequest(data) {
    var str = '';
    for (var i in data) {
      str += i + '=' + data[i] + '&';
    }
    str.substring(0, str.length - 1);
    return str;
  }
}
