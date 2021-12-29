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
  getAllMyCourses() {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
      },
    });
    return this.http.get<Response<{ courses: Course[] }>>(
      `${environment.apiUrl}:8026/coursesController/searchAllMyCourses`,
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
      `${environment.apiUrl}:8022/projectController/searchProject`,
      { params }
    );
  }

  getColumnItems(p_id: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        p_id,
      },
    });
    return this.http.get<Response<{ grades: GradeItem[] }>>(
      `${environment.apiUrl}:8022/projectController/getGradeItems`,
      { params }
    );
  }
  getAssignmentDone(p_id: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        p_id,
      },
    });
    return this.http.get<
      Response<{
        totalAssignmentNum: number;
        doneInformations: { s_id: string; s_name: string; doneNum: number }[];
      }>
    >(`${environment.apiUrl}:8027/assignmentController/countAssignmentDone`, { params });
  }
  getCountDiscussion(p_id: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        p_id,
      },
    });
    return this.http.get<
      Response<{ maxDiscussNum: number; discussInformations: ItemData[] }>
    >(`${environment.apiUrl}:8025/discussionAndReplyController/countDiscussion`, { params });
  }
  getSelfAndMutualScore(p_id: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        p_id,
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
    >(`${environment.apiUrl}:8024/evaluateController/SelfAndMutualevaluateScore`, { params });
  }
  getGradeItemScore(p_id: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        p_id,
      },
    });
    return this.http.get<
      Response<{
        allItems: {
          u_id: string;
          u_name: string;
          itemsList: { item_id: string; item_name: string; grade: number }[];
        }[];
      }>
    >(`${environment.apiUrl}:8022/projectController/getItemsByPid`, { params });
  }

  postGradeItemScore(p_id: string, itemData: ItemData) {
    const insertData = [];
    itemData.dynamicScore.forEach((dynamicScore) => {
      const temp = {
        item_id: dynamicScore.item_id,
        p_id,
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
      `${environment.apiUrl}:8024/evaluateController/evaluateByTeacher`,
      this.transformRequest(params),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
  }

  getStudentSelfScore(p_id: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        p_id,
      },
    });
    return this.http.get<Response<{ grade: number }>>(
      `${environment.apiUrl}:8024/evaluateController/searchEvaluateBySelf`,
      { params }
    );
  }

  getStudentMutualScore(p_id: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        p_id,
      },
    });
    return this.http.get<Response<{ grade: number }>>(
      `${environment.apiUrl}:8024/evaluateController/searchEvaluateByOther`,
      { params }
    );
  }

  getStudentTeacherScore(p_id: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        p_id,
      },
    });
    return this.http.get<
      Response<{ grades: { item_id: string; grade: number }[] }>
    >(`${environment.apiUrl}:8024/evaluateController/searchEvaluateByTeacher`, { params });
  }

  getStudentDiscussionAndAssignmentNum(p_id: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        p_id,
      },
    });
    return this.http.get<
      Response<{ discussionCount: number; assignmentDoneCount: number }>
    >(`${environment.apiUrl}:8025/discussionAndReplyController/getStudentDiscussonAndAssignmentCountByPid`, {
      params,
    });
  }

  updateTeacherGrade(teacherScores: any) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        student_project_list: JSON.stringify(teacherScores),
      },
    });
    return this.http.put<Response<{}>>(
      `${environment.apiUrl}:8024/evaluateController/updateTeacherGrade`,
      params
    );
  }

  getRating(projectId: number) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        p_id: String(projectId),
      },
    });
    return this.http.get<Response<{ rateMapping: Rating[] }>>(
      `${environment.apiUrl}:8024/evaluateController/getMyEvaluation`,
      { params }
    );
  }

  toRating(projectId: number, u_Id: string, grade: number) {
    const params = {
      pbl_token: String(this.userService.getUser().token),
      p_id: String(projectId),
      u_id: u_Id,
      grade,
    };
    return this.http.post<any>(
      `${environment.apiUrl}:8024/evaluateController/evaluateOther`,
      this.transformRequest(params),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
  }

  getEvaluateDone(projectId: number) {
    const params = {
      pbl_token: String(this.userService.getUser().token),
      p_id: String(projectId),
    };
    return this.http.get<Response<boolean>>(
      `${environment.apiUrl}:8024/evaluateController/evaluateDone`,
      { params }
    );
  }

  transformRequest(data) {
    let str = '';
    for (const i in data) {
      str += i + '=' + data[i] + '&';
    }
    str.substring(0, str.length - 1);
    return str;
  }
}
