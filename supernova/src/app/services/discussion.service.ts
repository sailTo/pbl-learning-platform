import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Reply } from '../models/reply';
import { Discussion } from '../models/discussion';
import { Response } from '../models/generic-response';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DiscussionService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getAllDiscussion(projectId: number) {
    const params = new HttpParams({
      fromObject: {
        p_id: String(projectId),
        pbl_token: String(this.userService.getUser().token),
      },
    });
    return this.http.get<Response<{ discussions: Discussion[] }>>(
      `${environment.apiUrl}:8025/discussionAndReplyController/searchDiscussions`,
      { params }
    );
  }

  getReplyByDid(discussionId: number) {
    const params = new HttpParams({
      fromObject: {
        d_id: String(discussionId),
        pbl_token: String(this.userService.getUser().token),
      },
    });
    return this.http.get<Response<{ replies: Reply[] }>>(
      `${environment.apiUrl}:8025/discussionAndReplyController/searchReply`,
      {
        params,
      }
    );
  }

  deleteDiscussion(d_id: number, p_id: number) {
    const params = {
      pbl_token: String(this.userService.getUser().token),
      p_id: String(p_id),
      d_id: String(d_id),
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params,
    };
    this.http
      .delete(`${environment.apiUrl}:8025/discussionAndReplyController/deleteDiscussion`, options)
      .subscribe((s) => {
        console.log(s);
      });
  }

  deleteReply(r_id: number) {
    const params = {
      pbl_token: String(this.userService.getUser().token),
      r_id: String(r_id),
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params,
    };
    this.http
      .delete(`${environment.apiUrl}:8025/discussionAndReplyController/deleteReply`, options)
      .subscribe((s) => {
        console.log(s);
      });
  }

  createDiscussion(discussion: String) {
    const params = {
      pbl_token: String(this.userService.getUser().token),
      discussion,
    };
    return this.http.post<Response<{ d_id: number }>>(
      `${environment.apiUrl}:8025/discussionAndReplyController/createDiscussion`,
      this.transformRequest(params),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
  }

  createReply(reply: String) {
    const params = {
      pbl_token: String(this.userService.getUser().token),
      reply,
    };
    return this.http.post<Response<{ r_id: number }>>(
      `${environment.apiUrl}:8025/discussionAndReplyController/createReply`,
      this.transformRequest(params),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
  }
  transformRequest(data) {
    let str = '';
    for (let i in data) {
      str += i + '=' + data[i] + '&';
    }
    str.substring(0, str.length - 1);
    return str;
  }
}
