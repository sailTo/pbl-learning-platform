import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private cookie : CookieService) { }
  getCookie(key:string){
    return this.cookie.get(key);
  }
  setCookie(key:string,value:any){
    this.cookie.set(key,value);
  }
}
