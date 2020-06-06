import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {environment} from '../environments/environment'
import { User } from '../app/models/user';

const users: User[] = [
    {   u_id: "123",
        type: "student", 
        u_name: "wqd", 
        gender: "male",
        description: "a simple description",
        image: "../img.img",
        password: "wqd"  }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { id, password } = body;
            alert(id);
            alert(password);
            const user = users.find(x => x.u_id === id && x.password === password);
            if (!user) return error('用户名或密码不正确');
            return ok({
                u_id: user.u_id,
                type: user.type, 
                u_name: user.u_name, 
                gender: user.gender,
                description: user.description,
                image: user.image,
                token: 'fake-jwt-token'
            })
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        // function getUserById(){
        //     // alert(1);
        //     // if (!isLoggedIn()) return unauthorized();

        //     // const user_id = urlWithParams.split("?")[1].split("=")[1];

        //     const user = users.find(x => x.u_id === user_id);
        //     // alert(user);
        //     if (!user) return error("没有此用户");
        //     return ok(user);
        // }
        // function getShowUsers(){
        //     if (!isLoggedIn()) return unauthorized();
        //     const user_id = JSON.parse(localStorage.getItem("User")).u_id;
        //     const user = users.find(x => x.u_id === +user_id);

        //     if (!user) return error("没有此用户");
        //     return ok(user);
        // }
        // function checkPassword(){
        //     const user_id = urlWithParams.split("?")[1].split("=")[1];
        //     const password= urlWithParams.split("?")[2].split("=")[1];
        //     const user = users.find(x => x.u_id === +user_id && x.password === password);
        //     if (!user) return error('您的密码不正确!');
        //     return ok({
        //         valid : true
        //     })
        // }


        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === environment.jwtHeader+" fake-jwt-token";
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
