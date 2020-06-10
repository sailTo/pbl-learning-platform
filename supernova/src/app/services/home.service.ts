import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Response } from '../models/generic-response';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  current_user: Observable<User>;
  constructor(private http: HttpClient) {}
  getUser(u_id2: string) {
    //  const user_id =  JSON.parse(localStorage.getItem("User")).u_id;
    //  alert(user_id);
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
  changeInformation(user: User, changeImage: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        content: JSON.stringify(user),
        image: changeImage,
      },
    });
    // const params = {
    //   "pbl_token": String(JSON.parse(localStorage.getItem("User")).token),
    //   "messages": JSON.stringify(user),
    //   "image" : changeImage
    // }

    return this.http.put<any>(`${environment.apiUrl}/api/changeMyInformation`, params);
  }
  uploadImg(img: any, u_id: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(JSON.parse(localStorage.getItem('User')).token),
        u_id: u_id,
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
    // return this.http.put<Response<{img:string}>>(`${environment.apiUrl}/api/changeMyImage`,params,headers);
    const req = new HttpRequest(
      'PUT',
      `${environment.apiUrl}/api/changeMyImage`,
      formData,
      {
        headers: headers,
        params: params,
      }
    );
    return this.http
      .request(req)
      .pipe(filter((e) => e instanceof HttpResponse));
  }
}
