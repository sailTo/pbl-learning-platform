import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { User } from '../models/user';
import { Response } from '../models/generic-response';
import { Md5 } from 'ts-md5/dist/md5';
import { environment } from 'src/environments/environment';
// import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getUser(): User {
    if (localStorage.getItem('User')) {
      return JSON.parse(localStorage.getItem('User'));
    } else {
      return undefined;
    }
  }

  getGroupersByProjectId(projectId: number) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.getUser().token),
        p_id: String(projectId),
      },
    });
    return this.http.get<Response<{ leader: string; groupers: User[] }>>(
      `${environment.apiUrl}/api/searchGroupers`,
      { params }
    );
  }

  logout(): void {
    localStorage.removeItem('User');
    this.router.navigate(['/passport/login']);
  }

  checkValidId(u_id: string) {
    const params = new HttpParams({
      fromObject: {
        u_id,
      },
    });
    return this.http.get<Response<{}>>(
      `${environment.apiUrl}/account/searchId`,
      { params }
    );
  }

  register(validateForm: FormGroup) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    });
    const params = new HttpParams({
      fromObject: {
        u_id: 'S' + validateForm.controls.u_id.value,
        u_name: validateForm.controls.u_name.value,
        gender: validateForm.controls.gender.value,
        password: String(Md5.hashStr(validateForm.controls.password.value)),
        description: '',
      },
    });
    return this.http.post<Response<{ user: User; image: string }>>(
      `${environment.apiUrl}/account/register`,
      params.toString(),
      { headers }
    );
  }

  login(id: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    });
    const params = new HttpParams({
      fromObject: {
        u_id: id,
        password: String(Md5.hashStr(password)),
      },
    });
    return this.http.post<Response<{ image: string; user: User }>>(
      `${environment.apiUrl}/account/login`,
      params.toString(),
      { headers }
    );
  }

  getUserById(u_id: string) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.getUser().token),
        u_id,
      },
    });
    return this.http.get<Response<{ user: User }>>(
      `${environment.apiUrl}/api/getUserByUid`,
      { params }
    );
  }
}
