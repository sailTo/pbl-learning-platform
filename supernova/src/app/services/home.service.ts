import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Response } from '../models/generic-response';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  current_user: Observable<User>;
  constructor(private http: HttpClient) { }
  getUser(u_id2: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        u_id: u_id2,
      },
    });
    return this.http.get<Response<{ content: User }>>(
      `${environment.apiUrl}/api/searchMyInformation`,
      { params }
    );
  }
  changeInformation(user: User) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        content: JSON.stringify(user),
      },
    });

    return this.http.put<any>(`${environment.apiUrl}/api/changeMyInformation`, params);
  }
  uploadImg(img: any, u_id: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        u_id,
      },
    });
    const formData = new FormData();
    formData.append('image', img);
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,GET,PUT',
      'Access-Control-Max-Age': '1728000',
      'Access-Control-Allow-Headers':
        'Content-Type,Access-Token,Authorization,ybg',
    });
    const req = new HttpRequest(
      'PUT',
      `${environment.apiUrl}/api/changeMyImage`,
      formData,
      {
        headers,
        params,
      }
    );
    return this.http
      .request(req)
      .pipe(filter((e) => e instanceof HttpResponse));
  }
}
