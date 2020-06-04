import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from '../models/user';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  current_user : Observable<User>;
  constructor(
    private http: HttpClient
  ) { }
  getUser(){
    //  const user_id =  JSON.parse(localStorage.getItem("User")).u_id;
    //  alert(user_id);
    const params = new HttpParams({fromObject:{
      pbl_token: String(JSON.parse(localStorage.getItem("User")).token),
    }})
    return this.http.get<any>(`${environment.apiUrl}/api/searchMyInformation`,{params});
          
  }
  changeInformation(user:User,changeImage:string){
    const params = new HttpParams({fromObject:{
      pbl_token: String(JSON.parse(localStorage.getItem("User")).token),
      messages: JSON.stringify(user),
      image : changeImage
    }})
    return this.http.put<any>(`${environment.apiUrl}/api/changeMyInformation`,{params});
  }
}
