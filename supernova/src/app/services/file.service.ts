import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { File } from "../models/file";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient
  ) { }

  getFilesByProjectId(projectId: number) {
    const params = new HttpParams({ fromObject: {
      p_id: String(projectId), 
    }});
    return this.http.get<{files: File[]}>('/api/searchAllFiles', { params });
  }
}
