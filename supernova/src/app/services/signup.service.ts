import { Injectable } from '@angular/core';
import {User} from '../models/user';
import { HttpParams } from '@angular/common/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private http: HttpClient
  ) { }
  checkValidId(thisu_id :number){
    const params = new HttpParams({fromObject:{
      u_id :String(thisu_id),
    }})
    return this.http.get<any>(`${environment.apiUrl}/account/searchId`,{params});
  }
  register(validateForm:FormGroup){
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"
      })
    }
    alert(validateForm.controls.id.value);
    // const params = new HttpParams({ fromObject: {
    //   u_id: validateForm.controls.id.value,
    //   u_name:validateForm.controls.name.value,
    //   gender:validateForm.controls.gender.value,
    //   password:validateForm.controls.password.value,
    // }});
    const params = {
      u_id: validateForm.controls.id.value,
      u_name:validateForm.controls.name.value,
      gender:validateForm.controls.gender.value,
      password:validateForm.controls.password.value,
    };
    return this.http.post<any>(`${environment.apiUrl}/account/register`,
      this.transformRequest(params),
      {headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          });
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
