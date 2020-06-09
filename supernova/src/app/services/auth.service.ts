import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('User'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public setCurrentUserValue(user: User) {
    this.currentUserSubject.next(user);
  }

  login(id: string, apassword: string) {
    const params = {
      u_id: id,
      password: apassword,
    };
    return this.http.post<any>(
      `/account/login`,
      this.transformRequest(params),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
  }
  logout(): void {
    localStorage.removeItem('User');
    this.currentUserSubject.next(null);
  }
  transformRequest(data) {
    var str = '';

    for (var i in data) {
      str += i + '=' + data[i] + '&';
    }

    str.substring(0, str.length - 1);

    return str;
  }
}
