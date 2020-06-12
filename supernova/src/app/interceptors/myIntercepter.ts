import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse,
    HttpHeaderResponse,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import {Response} from  '../models/generic-response';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from 'src/app/services/user.service';

@Injectable({
    providedIn: 'root',
  })

export class MyInterceptor implements HttpInterceptor {
    constructor (
        private msgService : NzMessageService,
        private userService: UserService
    ){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<
    | HttpHeaderResponse
    | HttpResponse<any>
  > {　
        let req = request.clone();//这里可以在请求中加参数
        return next.handle(req).pipe( mergeMap((event: any) => {
            // 正常返回，处理具体返回参数
            if (event instanceof HttpResponse && event.status === 200)
                return this.handleData(event);//具体处理请求返回数据
                return of(event);
        }),
        catchError((err: HttpErrorResponse) => this.handleData(err)))
      }

      private handleData(
        event: HttpResponse<any> | HttpErrorResponse,
      ): Observable<any> {
        // 业务处理：一些通用操作
            if (event instanceof HttpResponse) {
                const body: Response<any> = event.body;
                switch(body.code){
                    case 200:
                        return of(event);
                    case 208:
                        this.msgService.info(body.message);
                        this.userService.logout();
                        return of(event);
                    default:
                        this.msgService.info(body.message);
                        return of(event);
                }
                
            }
        
      }
}