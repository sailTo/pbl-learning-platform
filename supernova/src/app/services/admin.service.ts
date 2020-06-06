import { Injectable } from '@angular/core';
import {User} from '../models/user';
import { HttpClient,HttpParams } from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http:HttpClient,
  ) { }
  updateInformation(user:User){
    const params = new HttpParams({fromObject:{
      pbl_token: String(JSON.parse(localStorage.getItem("User")).token),
      content: JSON.stringify(user),
      
    }})
    return this.http.put<any>(`${environment.apiUrl}/api/changeInformation`,{params});
  }

}
