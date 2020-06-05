import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Response } from "../models/generic-response";
import {Rating} from "../models/rating";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(
    private http: HttpClient
  ) { }

  getRating(projectId: number) {
    const params = new HttpParams({ fromObject: {
        token:"123456",
        p_id: String(projectId),
    }});
    return this.http.get<Response<{ratings: Rating[]}>>('/api/getMyEvaluation', { params });
  }

  Rating(projectId: number, u_Id: string, grade:number) {
    const params = new HttpParams({ fromObject: {
        token:"123456",
        p_id: String(projectId),
        u_id: u_Id,
        grade: String(grade)
    }});
    return this.http.post<Response<{file_str: string}>>('/api/evaluateOther', { params });
  }

  SelfRating(projectId: number, u_Id: string, grade:number) {
    const params = new HttpParams({ fromObject: {
        token:"123456",
        p_id: String(projectId),
        grade: String(grade)
      }});
    return this.http.post<Response<{file_str: string}>>('/api/evaluateOther', { params });
  }
}
