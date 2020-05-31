import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FileService } from 'src/app/services/file.service';

import { File } from "src/app/models/file";
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {  
  p_id: number;
  files: File[];
  groupers: User[];

  file = {
    f_id: 4,
    p_id: 4,
    u_id: 4,
    f_name: '文件名称',
    description: '文件描述',
    file_URL: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
  }

  constructor(
    private route: ActivatedRoute, 
    private fileService: FileService, 
  ) { }

  ngOnInit(): void {
    // get files
    // this.getFiles();
    this.files = [
      JSON.parse(JSON.stringify(this.file)), 
      JSON.parse(JSON.stringify(this.file)), 
      JSON.parse(JSON.stringify(this.file))
    ];

    // get param p_name, groupers
    this.route.queryParams.subscribe(
      (params: {p_id: string, p_name: string, groupers: string}) => {
        this.p_id = Number(params.p_id);
        this.groupers = JSON.parse(params.groupers);

        this.processFiles();
      }
    );
  }

  getFiles(): void {
    this.fileService.getFilesByProjectId(this.p_id).subscribe((data) => {
      this.files = data.files;
    });
  }

  processFiles(): void {
    this.files.forEach((file, index) => {
      // map u_id in file to u_name
      file['u_name'] = this.groupers.find(
        (grouper) => grouper.u_id === file.u_id
      )['u_name'];

      // add key to each file
      file['key'] = index + 1;
    });
  }

}
