import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpParams,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';

import { File } from '../models/file';
import { Response } from '../models/generic-response';
import { UserService } from './user.service';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getFilesByProjectId(projectId: number) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        p_id: String(projectId),
      },
    });
    return this.http.get<Response<File[]>>(
      `${environment.apiUrl}:8023/fileController/searchAllFiles`,
      { params }
    );
  }

  upLoadFile(
    file: any,
    fileName: string,
    descriptionStr: string,
    projectId: number
  ): any {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        f_name: fileName,
        p_id: String(projectId),
        description: descriptionStr,
      },
    });

    const formData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest(
      'POST',
      `${environment.apiUrl}:8023/fileController/uploadFile`,
      formData,
      {
        // const req = new HttpRequest('POST', 'http://127.0.0.1:8081/api/uploadFile', formData, {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST,GET',
          'Access-Control-Max-Age': '1728000',
          'Access-Control-Allow-Headers':
            'Content-Type,Access-Token,Authorization,ybg',
        }),
        params,
      }
    );

    return this.http
      .request(req)
      .pipe(filter((e) => e instanceof HttpResponse));
  }

  deleteFile(projectId: number, fileId: number) {
    const params = new HttpParams({
      fromObject: {
        pbl_token: String(this.userService.getUser().token),
        f_id: String(fileId),
        p_id: String(projectId),
      },
    });
    return this.http.delete<Response<{}>>(
      `${environment.apiUrl}:8023/fileController/deleteFile`,
      { params }
    );
  }
}
