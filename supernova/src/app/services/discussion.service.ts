import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Reply } from '../models/reply';
import { Discussion } from '../models/discussion';
import {Response} from "../models/generic-response";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  constructor(
    private http: HttpClient,
    private userService:UserService
  ) { }

  getAllDiscussion(projectId: number) {
    const params = new HttpParams({ fromObject: {
        p_id: String(projectId),
        pbl_token: String(this.userService.getUser().token),
      }});
    return this.http.get<Response<{discussions: Discussion[]}>>('/api/searchDiscussions', { params });
  }

  getReplyByDid(discussionId: number) {
    const params = new HttpParams({ fromObject: {
        d_id: String(discussionId),
        pbl_token: String(this.userService.getUser().token),
      }});
    return this.http.get<Response<{replies: Reply[]}>>('/api/searchReply', { params });
  }
}
