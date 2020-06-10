import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { NzMessageService } from 'ng-zorro-antd';

import { UserService } from '../services/user.service';

import { Response } from 'src/app/models/generic-response';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GenericInterceptor implements HttpInterceptor {
  constructor(
    private message: NzMessageService,
    private userService: UserService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request);
    return next.handle(request).pipe(
      catchError((err, err$) => {
        // err$其代表上游的Observable对象，当直接返回这个对象时，会启动catchError的重试机制。
        const tip = err.status === 200 ? err.body.error.reason : '系统繁忙，请稍后再试';
        console.log(tip, '后端接口报错');
        if (err.status === 400 && 1 < 5) {
          console.log(1, '重试次数');
          return err$;
        } else {
          throw err;
        }
      })
    );
  }

  handleResponse(response: Response<{}>) {
    if (response.code === 200) {
      this.message.success(response.message);
    } else if (response.code === 208) {
      this.message.error(response.message);
      this.userService.logout();
    } else if (response.code === 209) {
      this.message.error(response.message);
    }
  }
}
