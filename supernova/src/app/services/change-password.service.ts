import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import { HttpParams } from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(
    private http:HttpClient,
    private authService:AuthService
  ) { 

  }
  changePassword(oldPassword:string,newPassword:string){
       const params = new HttpParams({fromObject:{
        pbl_token: String(JSON.parse(localStorage.getItem("User")).token),
        oldPassword: oldPassword,
        newPassword: newPassword
      }})
      return this.http.put<any>(`${environment.apiUrl}/api/changeMyPassword`,{params});
    // if(this.checkPassword(oldPassword)){
    //   //合法， 可以完成修改,向服务器请求修改password

    // }
  }
  // checkPassword(password:string):boolean{
  //   const params = new HttpParams({fromObject:{
  //     u_id : String(JSON.parse(localStorage.getItem("User")).u_id),
  //     password: password
  //   }})
   
  //  const ret= this.http.get<any>(`${environment.apiUrl}/checkPassword`,{params});
  //  return ret!=null
  // }
}
