import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import {User} from '../models/user';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')));
    this.currentUser = this.currentUserSubject.asObservable();
   }
   public get currentUserValue(): User {
    return this.currentUserSubject.value;
}
  login(id: number, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { id, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('User', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    // return of(true).pipe(
    //   delay(1000),
    //   tap(val => this.isLogin = true)
    // );
  }
  logout(): void {
    localStorage.removeItem('User');
    this.currentUserSubject.next(null);
  }
}
