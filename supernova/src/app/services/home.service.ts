import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from '../models/user';
import {Response} from  '../models/generic-response';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  current_user : Observable<User>;
  constructor(
    private http: HttpClient
  ) { }
  getUser(u_id2:string){
    //  const user_id =  JSON.parse(localStorage.getItem("User")).u_id;
    //  alert(user_id);
    const params = new HttpParams({fromObject:{
      pbl_token: String(JSON.parse(localStorage.getItem("User")).token),
      u_id : u_id2
    }})
    return this.http.get<Response<{content:User}>>(`${environment.apiUrl}/api/searchMyInformation`,{params});
          
  }
  changeInformation(user:User,changeImage:string){
    const params = new HttpParams({fromObject:{
      pbl_token: String(JSON.parse(localStorage.getItem("User")).token),
      content: JSON.stringify(user),
      image : changeImage
    }})
    // const params = {
    //   "pbl_token": String(JSON.parse(localStorage.getItem("User")).token),
    //   "messages": JSON.stringify(user),
    //   "image" : changeImage
    // }
    
    return this.http.put<any>(`${environment.apiUrl}/api/changeMyInformation`,params);
  }
}
