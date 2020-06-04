import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject,Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import {User} from '../models/user';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';

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
    public setCurrentUserValue(user:User){
      this.currentUserSubject.next(user);
    }
  login(id: string, apassword: string) {
    
    const params = {
      u_id: id,
      password:apassword    
    }
   return this.http.post<any>(`${environment.apiUrl}/account/login`, this.transformRequest(params), {headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded'
            })
      
          });
      // .pipe(map(data => {
      //           // store user details and jwt token in local storage to keep user logged in between page refreshes
      //           if(data.code!=200){
      //             return;
      //           }else{
      //             var ret_user;
      //             ret_user = JSON.parse(data.user);
      //             ret_user.token = JSON.parse(data.message).token;
      //             ret_user.image = data.image;
      //             localStorage.setItem('User', JSON.stringify(ret_user));
      //             this.currentUserSubject.next(ret_user);
                  
      //           }
      //          }));
    
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
    
      };
}
