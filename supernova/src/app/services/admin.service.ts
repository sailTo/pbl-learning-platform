import { Injectable } from '@angular/core';
import {User} from '../models/user';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Response} from '../models/generic-response';
import {FormGroup} from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http:HttpClient,
  ) { }
  getUserInformation(){
    const params = new HttpParams({fromObject:{
      pbl_token: String(JSON.parse(localStorage.getItem("User")).token),
    }})
    return this.http.get<Response<{users: User[],images:string[]}>>(`${environment.apiUrl}/api/searchAllUsers`,{params});
  }

  updateInformation(user:User){
    const params = new HttpParams({fromObject:{
      pbl_token: String(JSON.parse(localStorage.getItem("User")).token),
      user: JSON.stringify(user),
      
    }})
    return this.http.put<Response<{}>>(`${environment.apiUrl}/api/changeInformation`,params);
  }
  addNewUser(user:User){
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"
      })
    }
    const params = {
      pbl_token: String(JSON.parse(localStorage.getItem("User")).token),
      user:JSON.stringify(user),
    };
    return this.http.post<Response<{}>>(`${environment.apiUrl}/api/addUser`,this.transformRequest(params),headers) 
  }
  transformRequest(data) {

            var str = '';
    
            for (var i in data) {
    
              str += i + '=' + data[i] + '&';
    
            }
    
            str.substring(0, str.length - 1);
    
            return str;
    
      };
}
