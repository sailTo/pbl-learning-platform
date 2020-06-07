import { Injectable } from '@angular/core';
import { HttpClient,HttpRequest, HttpParams ,HttpResponse, HttpEvent} from '@angular/common/http';

import { File } from "../models/file";
import { Response } from "../models/generic-response"; 
import {UserService} from "./user.service";
import { UploadFile } from 'ng-zorro-antd/upload';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FileService {

  constructor(
    private http: HttpClient,    
    private userService: UserService,
  ) { }

  getFilesByProjectId(projectId: number) {
    const params = new HttpParams({ fromObject: {
      pbl_token:String(this.userService.getUser().token),
      p_id: String(projectId), 
    }});
    return this.http.get<Response<File[]>>('/api/searchAllFiles', { params });
  }

  getFileString(projectId: number, fileId: number) {
    const params = new HttpParams({ fromObject: {
      f_id: String(fileId), 
      p_id: String(projectId), 
    }});
    return this.http.get<Response<{file_str: string}>>('/api/downloadFile', { params });
  }

  upLoadFile(file:any,fileName:string,descriptionStr:string,projectId:number):any{
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        f_name: fileName,
        p_id: String(projectId), 
        description: descriptionStr
      }
    });

    const formData = new FormData();
    formData.append('file',file);

    const req = new HttpRequest('POST', 'http://123.56.219.88:8081/api/uploadFile', formData, {
      params
    });
    
    this.http
    .request(req)
    .pipe(filter(e => e instanceof HttpResponse))
    .subscribe(
      (test:any) => {
        console.log("upload success!");
        console.log(test.body.data["file"]);
        console.log(test.body.data);
        
        return test.body.data["file"];        
      },
      () => {
        console.log("upload fail!");
        return null;
      }
    );

    // return this.http.post<Response<{file_str: string}>>('/api/uploadFile',formData,{ params });
  }

  deleteFile(projectId: number, fileId: number) {
    const params = new HttpParams({ fromObject: {
      f_id: String(fileId), 
      p_id: String(projectId), 
    }});
    return this.http.delete<Response<{}>>('/api/deleteFile', { params });
  }

  
}
